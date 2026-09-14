using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using VREverywhere.Models;

namespace VREverywhere.Network
{
    public class ApiClient : MonoBehaviour
    {
        public static ApiClient Instance { get; private set; }

        [Header("API Configuration")]
        [SerializeField] private string baseUrl = "http://localhost:8080/api";
        private string jwtToken = "";

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(gameObject);
            }
        }

        public void SetJwtToken(string token)
        {
            jwtToken = token;
        }

        // Fetch Destinations from Spring Boot REST API
        public IEnumerator FetchDestinations(Action<string> onSuccess, Action<string> onError)
        {
            using (UnityWebRequest request = UnityWebRequest.Get($"{baseUrl}/destinations"))
            {
                if (!string.IsNullOrEmpty(jwtToken))
                {
                    request.SetRequestHeader("Authorization", "Bearer " + jwtToken);
                }

                yield return request.SendWebRequest();

                if (request.result == UnityWebRequest.Result.Success)
                {
                    onSuccess?.Invoke(request.downloadHandler.text);
                }
                else
                {
                    onError?.Invoke(request.error);
                }
            }
        }

        // Download 360 Panoramic Texture from URL
        public IEnumerator DownloadPanoramaTexture(string url, Action<Texture2D> onTextureLoaded, Action<string> onError)
        {
            using (UnityWebRequest request = UnityWebRequestTexture.GetTexture(url))
            {
                yield return request.SendWebRequest();

                if (request.result == UnityWebRequest.Result.Success)
                {
                    Texture2D texture = DownloadHandlerTexture.GetContent(request);
                    onTextureLoaded?.Invoke(texture);
                }
                else
                {
                    onError?.Invoke(request.error);
                }
            }
        }

        // Add to favorites API call
        public IEnumerator SaveFavorite(string destinationId, Action<bool> onComplete)
        {
            using (UnityWebRequest request = UnityWebRequest.PostWwwForm($"{baseUrl}/favorites/{destinationId}", ""))
            {
                if (!string.IsNullOrEmpty(jwtToken))
                {
                    request.SetRequestHeader("Authorization", "Bearer " + jwtToken);
                }

                yield return request.SendWebRequest();
                onComplete?.Invoke(request.result == UnityWebRequest.Result.Success);
            }
        }
    }
}
