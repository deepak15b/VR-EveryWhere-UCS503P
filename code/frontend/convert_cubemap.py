import numpy as np
from PIL import Image
import os

# Load the 6 cube faces from KrPano
# f: front, b: back, l: left, r: right, u: up, d: down
faces = {}
for name in ['f', 'b', 'l', 'r', 'u', 'd']:
    img_path = f'test_pano_{name}.jpg'
    img = Image.open(img_path).convert('RGB')
    faces[name] = np.array(img, dtype=np.float32)

face_size = faces['f'].shape[0] # 1904
print(f"Loaded faces of size {face_size}x{face_size}")

out_width = 4096
out_height = 2048

# Create coordinate grid for equirectangular image
# x_eq: 0..out_width-1, y_eq: 0..out_height-1
x_eq = np.linspace(0, out_width - 1, out_width, dtype=np.float32)
y_eq = np.linspace(0, out_height - 1, out_height, dtype=np.float32)
xx, yy = np.meshgrid(x_eq, y_eq)

# Normalized coordinates: theta (longitude) [-pi, pi], phi (latitude) [-pi/2, pi/2]
# We want the Taj Mahal (face 'l') to be in the center (theta = 0)
theta = (xx / out_width - 0.5) * 2.0 * np.pi
phi = (0.5 - yy / out_height) * np.pi

# 3D Cartesian coordinates
# We rotate by -90 degrees around Y axis so that 'l' (left face) is centered at theta = 0
# Original KrPano standard:
# front (f): +z
# back (b): -z
# left (l): -x
# right (r): +x
# up (u): +y
# down (d): -y
# To make 'l' (-x) face front (+z_rot), we map:
# z_orig = -x_rot
# x_orig = z_rot
# y_orig = y_rot

# Unrotated 3D ray for theta, phi:
x_ray = np.cos(phi) * np.sin(theta)
y_ray = np.sin(phi)
z_ray = np.cos(phi) * np.cos(theta)

# Rotate ray so center (theta=0, x_ray=0, z_ray=1) points towards left face (-x in KrPano):
# Let's verify: at theta=0, we want KrPano ray = (-1, 0, 0).
# So: x_k = -z_ray, z_k = x_ray, y_k = y_ray
x_k = -z_ray
y_k = y_ray
z_k = x_ray

abs_x = np.abs(x_k)
abs_y = np.abs(y_k)
abs_z = np.abs(z_k)

output = np.zeros((out_height, out_width, 3), dtype=np.uint8)

# 1. Front face: z_k > 0 and abs_z >= abs_x and abs_z >= abs_y
mask_f = (z_k > 0) & (abs_z >= abs_x) & (abs_z >= abs_y)
if np.any(mask_f):
    u = (x_k[mask_f] / z_k[mask_f] + 1.0) * 0.5 * (face_size - 1)
    v = (1.0 - y_k[mask_f] / z_k[mask_f]) * 0.5 * (face_size - 1)
    u = np.clip(np.round(u).astype(int), 0, face_size - 1)
    v = np.clip(np.round(v).astype(int), 0, face_size - 1)
    output[mask_f] = faces['f'][v, u]

# 2. Back face: z_k < 0 and abs_z >= abs_x and abs_z >= abs_y
mask_b = (z_k < 0) & (abs_z >= abs_x) & (abs_z >= abs_y)
if np.any(mask_b):
    u = (-x_k[mask_b] / (-z_k[mask_b]) + 1.0) * 0.5 * (face_size - 1)
    v = (1.0 - y_k[mask_b] / (-z_k[mask_b])) * 0.5 * (face_size - 1)
    u = np.clip(np.round(u).astype(int), 0, face_size - 1)
    v = np.clip(np.round(v).astype(int), 0, face_size - 1)
    output[mask_b] = faces['b'][v, u]

# 3. Right face: x_k > 0 and abs_x >= abs_y and abs_x >= abs_z
mask_r = (x_k > 0) & (abs_x >= abs_y) & (abs_x >= abs_z)
if np.any(mask_r):
    u = (-z_k[mask_r] / x_k[mask_r] + 1.0) * 0.5 * (face_size - 1)
    v = (1.0 - y_k[mask_r] / x_k[mask_r]) * 0.5 * (face_size - 1)
    u = np.clip(np.round(u).astype(int), 0, face_size - 1)
    v = np.clip(np.round(v).astype(int), 0, face_size - 1)
    output[mask_r] = faces['r'][v, u]

# 4. Left face: x_k < 0 and abs_x >= abs_y and abs_x >= abs_z
mask_l = (x_k < 0) & (abs_x >= abs_y) & (abs_x >= abs_z)
if np.any(mask_l):
    u = (z_k[mask_l] / (-x_k[mask_l]) + 1.0) * 0.5 * (face_size - 1)
    v = (1.0 - y_k[mask_l] / (-x_k[mask_l])) * 0.5 * (face_size - 1)
    u = np.clip(np.round(u).astype(int), 0, face_size - 1)
    v = np.clip(np.round(v).astype(int), 0, face_size - 1)
    output[mask_l] = faces['l'][v, u]

# 5. Up face: y_k > 0 and abs_y >= abs_x and abs_y >= abs_z
mask_u = (y_k > 0) & (abs_y >= abs_x) & (abs_y >= abs_z)
if np.any(mask_u):
    u = (x_k[mask_u] / y_k[mask_u] + 1.0) * 0.5 * (face_size - 1)
    v = (z_k[mask_u] / y_k[mask_u] + 1.0) * 0.5 * (face_size - 1)
    u = np.clip(np.round(u).astype(int), 0, face_size - 1)
    v = np.clip(np.round(v).astype(int), 0, face_size - 1)
    output[mask_u] = faces['u'][v, u]

# 6. Down face: y_k < 0 and abs_y >= abs_x and abs_y >= abs_z
mask_d = (y_k < 0) & (abs_y >= abs_x) & (abs_y >= abs_z)
if np.any(mask_d):
    u = (x_k[mask_d] / (-y_k[mask_d]) + 1.0) * 0.5 * (face_size - 1)
    v = (-z_k[mask_d] / (-y_k[mask_d]) + 1.0) * 0.5 * (face_size - 1)
    u = np.clip(np.round(u).astype(int), 0, face_size - 1)
    v = np.clip(np.round(v).astype(int), 0, face_size - 1)
    output[mask_d] = faces['d'][v, u]

out_img = Image.fromarray(output)
out_img.save('taj-mahal-front-4k.jpg', quality=92, optimize=True)
print("Saved taj-mahal-front-4k.jpg successfully!")
