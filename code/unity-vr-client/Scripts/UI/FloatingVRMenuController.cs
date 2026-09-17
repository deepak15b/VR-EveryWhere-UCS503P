using UnityEngine;
using UnityEngine.UI;
using VREverywhere.Models;

namespace VREverywhere.UI
{
    /// <summary>
    /// Implements Section 8 Core User Interface specification:
    /// "Inside the VR tour, a lightweight floating menu will provide: Map | Information | Audio | Settings | Exit Tour"
    /// </summary>
    public class FloatingVRMenuController : MonoBehaviour
    {
        [Header("Panel Containers")]
        [SerializeField] private GameObject mapPanel;
        [SerializeField] private GameObject infoPanel;
        [SerializeField] private GameObject audioPanel;
        [SerializeField] private GameObject settingsPanel;
        [SerializeField] private GameObject hotspotPopupPanel;

        [Header("Information Text Fields")]
        [SerializeField] private Text titleText;
        [SerializeField] private Text descriptionText;
        [SerializeField] private Text hotspotTitleText;
        [SerializeField] private Text hotspotDescText;

        [Header("Audio")]
        [SerializeField] private AudioSource narrationSource;

        private void Start()
        {
            CloseAllPanels();
        }

        public void CloseAllPanels()
        {
            if (mapPanel != null) mapPanel.SetActive(false);
            if (infoPanel != null) infoPanel.SetActive(false);
            if (audioPanel != null) audioPanel.SetActive(false);
            if (settingsPanel != null) settingsPanel.SetActive(false);
            if (hotspotPopupPanel != null) hotspotPopupPanel.SetActive(false);
        }

        // 1. Map Button
        public void OnClickMap()
        {
            bool isCurrent = mapPanel != null && mapPanel.activeSelf;
            CloseAllPanels();
            if (mapPanel != null) mapPanel.SetActive(!isCurrent);
        }

        // 2. Information Button
        public void OnClickInformation()
        {
            bool isCurrent = infoPanel != null && infoPanel.activeSelf;
            CloseAllPanels();
            if (infoPanel != null) infoPanel.SetActive(!isCurrent);
        }

        // 3. Audio Button
        public void OnClickAudio()
        {
            bool isCurrent = audioPanel != null && audioPanel.activeSelf;
            CloseAllPanels();
            if (audioPanel != null) audioPanel.SetActive(!isCurrent);
        }

        // 4. Settings Button
        public void OnClickSettings()
        {
            bool isCurrent = settingsPanel != null && settingsPanel.activeSelf;
            CloseAllPanels();
            if (settingsPanel != null) settingsPanel.SetActive(!isCurrent);
        }

        // 5. Exit Tour Button
        public void OnClickExitTour()
        {
            Debug.Log("[VR Tour]: Exiting tour session back to Explore view.");
            #if UNITY_EDITOR
                Debug.Log("Exiting VR session in Editor");
            #else
                UnityEngine.SceneManagement.SceneManager.LoadScene("ExploreScene");
            #endif
        }

        public void ShowHotspotInfoPanel(HotspotData data)
        {
            CloseAllPanels();
            if (hotspotPopupPanel != null)
            {
                if (hotspotTitleText != null) hotspotTitleText.text = data.title;
                if (hotspotDescText != null) hotspotDescText.text = $"{data.description}\n\n{data.details}";
                hotspotPopupPanel.SetActive(true);
            }
        }
    }
}
