using System.Collections.Generic;
using UnityEngine;
using VREverywhere.Models;
using VREverywhere.Interactions;

namespace VREverywhere.Controllers
{
    /// <summary>
    /// Coordinates the 360° VR Tour scene in Unity.
    /// Manages panoramic sphere texture, spawns 3D hotspots, and opens info dialogues.
    /// </summary>
    public class VRTourController : MonoBehaviour
    {
        [Header("360 Panoramic Sphere")]
        [SerializeField] private MeshRenderer skySphereRenderer;
        [SerializeField] private Material panoramaMaterial;

        [Header("Hotspot Spawning")]
        [SerializeField] private GameObject hotspotPrefab;
        [SerializeField] private Transform hotspotsContainer;

        [Header("Active Destination")]
        public DestinationData currentDestination;

        private List<GameObject> spawnedHotspots = new List<GameObject>();

        private void Start()
        {
            if (currentDestination != null)
            {
                InitializeTour(currentDestination);
            }
        }

        public void InitializeTour(DestinationData destination)
        {
            currentDestination = destination;

            // Clear old hotspots
            foreach (var hs in spawnedHotspots)
            {
                Destroy(hs);
            }
            spawnedHotspots.Clear();

            // Spawn 3D hotspots defined in the destination data
            if (destination.hotspots != null && hotspotPrefab != null)
            {
                foreach (var hsData in destination.hotspots)
                {
                    Vector3 worldPos = hsData.position.ToVector3();
                    GameObject hsObj = Instantiate(hotspotPrefab, worldPos, Quaternion.identity, hotspotsContainer);
                    
                    var interactable = hsObj.GetComponent<HotspotInteractable>();
                    if (interactable != null)
                    {
                        interactable.data = hsData;
                    }
                    spawnedHotspots.Add(hsObj);
                }
            }
        }

        public void DisplayHotspotInformation(HotspotData data)
        {
            var menu = FindObjectOfType<UI.FloatingVRMenuController>();
            if (menu != null)
            {
                menu.ShowHotspotInfoPanel(data);
            }
        }
    }
}
