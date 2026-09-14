using System;
using System.Collections.Generic;
using UnityEngine;

namespace VREverywhere.Models
{
    [Serializable]
    public class Vector3Data
    {
        public float x;
        public float y;
        public float z;

        public Vector3 ToVector3() => new Vector3(x, y, z);
    }

    [Serializable]
    public class HotspotData
    {
        public string id;
        public string title;
        public string description;
        public Vector3Data position;
        public string category;
        public string details;
    }

    [Serializable]
    public class DestinationData
    {
        public string id;
        public string name;
        public string location;
        public string continent;
        public string category;
        public float rating;
        public string coverImage;
        public string panoramaUrl;
        public string description;
        public string audioNarration;
        public List<string> historicalFacts;
        public List<string> attractions;
        public List<HotspotData> hotspots;
    }

    [Serializable]
    public class DestinationListResponse
    {
        public List<DestinationData> destinations;
    }

    [Serializable]
    public class AuthResponse
    {
        public string token;
        public string username;
        public string role;
    }
}
