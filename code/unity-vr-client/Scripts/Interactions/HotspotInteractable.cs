using UnityEngine;
using VREverywhere.Models;

namespace VREverywhere.Interactions
{
    /// <summary>
    /// Interactive 3D Hotspot for VR controller raycasts and gaze interaction.
    /// Compatible with OpenXR and XR Interaction Toolkit.
    /// </summary>
    public class HotspotInteractable : MonoBehaviour
    {
        [Header("Hotspot Information")]
        public HotspotData data;

        [Header("Visual Elements")]
        [SerializeField] private MeshRenderer pulseRingRenderer;
        [SerializeField] private float pulseSpeed = 2.5f;

        private Vector3 initialScale;

        private void Start()
        {
            initialScale = transform.localScale;
        }

        private void Update()
        {
            // Billboard effect: ensure hotspot marker always faces VR Headset camera
            if (Camera.main != null)
            {
                transform.LookAt(Camera.main.transform);
            }

            // Pulsing animation
            float scaleMultiplier = 1.0f + Mathf.Sin(Time.time * pulseSpeed) * 0.15f;
            transform.localScale = initialScale * scaleMultiplier;
        }

        // Called when XR Ray Interactor selects or clicks this hotspot
        public void OnSelectHotspot()
        {
            Debug.Log($"[Hotspot Clicked]: {data?.title}");
            var tourController = FindObjectOfType<Controllers.VRTourController>();
            if (tourController != null && data != null)
            {
                tourController.DisplayHotspotInformation(data);
            }
        }
    }
}
