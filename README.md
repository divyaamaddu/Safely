
**Safely** is a **Smart Tourist Safety System Dashboard** that provides real-time monitoring of tourist trips, alerts, and safety reports.  
 It integrates **Google Maps**, **live tracking**, and **alert management** into a clean, inclusive, and responsive dark-mode dashboard.

---

## 🌍 Overview

Safely enables real-time visualization of tourists’ journeys, unsafe zones, and safety alerts across destinations.  
It ensures both travelers and authorities can monitor, assess, and respond to risks efficiently.

🔹 **Tourist Tracking** — Live GPS visualization using leaflet  
🔹 **Smart Alerts** — Timestamped weather, safety, or zone alerts  
🔹 **Trip Reports** — Auto-generated summaries and zone categorizations  
🔹 **Real-Time Dashboard** — Seamless Socket.IO updates  
🔹 **Secure Authentication** — Google OAuth Sign-In  

---

## 🎨 Design & Branding

| Element | Description |
|----------|-------------|
| **Theme** | Professional, dark-mode aesthetic with safety tones (Blue, Green, Yellow, Red) |
| **Primary Color** | `#16365D` |
| **Inactive Color** | `#A0A0A0` |
| **Font** | Poppins |
| **Background** | Gradient: `#0f172a → #1e293b` |
| **Logo** | Provided PNG logo used in navbar and favicon |
| **Style** | Glassmorphism, rounded corners, and smooth hover transitions |

---

## ⚙️ Tech Stack

**Frontend:**  
- React.js 
- Tailwind CSS   

**Backend:**  
- Node.js + Express.js  
- MongoDB (Mongoose ORM)  
- Socket.IO for real-time communication  

**Authentication:**  
- Google Sign-In (OAuth 2.0)

**Utilities:**  
- GeoJSON for zone mapping  
- WebSocket for live location updates  
- dotenv for environment configuration  

---

## 🧩 Page Structure

| Page | Description |
|------|--------------|
| **Page 1** | Sign-In Page — Google OAuth login with redirection to dashboard |
| **Page 2** | Dashboard — Map + Real-time alerts panel |
| **Page 3** | Alerts & Trips Overview — Tabs for Alerts, Trips, and Reports |
| **Page 4** | Trip/Report Details — Live map view with visited places list |
| **Page 5** | Alert Categories — Active, Inactive, Resolved, Pending alerts |
| **Page 6** | Alert Details — Individual alert info and map-centered location |
| **Page 7** | Tourist Management — Searchable tourist list |
| **Page 8** | Tourist Profile — Trips and Reports tab view |

---

## 🗺️ Key Functionalities

### 🚨 Alerts
- Real-time unsafe zone, weather, and restriction alerts.
- Severity indicators:
  - 🔴 Critical  
  - 🟡 Moderate  
  - 🟢 Safe  
  - ⚫ Restricted  
- Each alert has timestamps and category badges.

### 🧭 Trips Overview
- Each trip has a unique random ID:
  - Trip ID: `TRIP-A91X4`
  - Tourist ID: `TST-7YB92`
- Displays tourist details, status, and route preview.
- Color-coded status (Green = Active, Grey = Completed).
- Clickable cards navigate to trip details.

### 🗺️ Trip Detailed View
- Split layout:
  - Left → Scrollable list of visited places:
    🏨 Hotels, 🍴 Restaurants, 🕍 Temples, 🏞️ Tourist Spots.
  - Right → Interactive Google Map:
    - Active Trips → Live location tracking via Socket.IO.
    - Completed Trips → Route visualization with start & end markers.
- Zone Overlays:
  - 🟢 Safe Zone
  - 🟡 Moderate Zone
  - 🔴 Danger Zone
  - ⚫ Restricted Zone

### 👥 Tourist Management
- Search and filter by name or ID.
- Click to view tourist profiles and trip history.

### 🧾 Reports
- Summaries of trips and incidents.
- Highlighted zone-based insights (danger/congested areas).

---

## 🧠 Backend Logic

- Generates random alphanumeric IDs for `tripId` and `touristId`.
- Stores trip, alert, and user data in MongoDB.
- GeoJSON polygons define safety zones on maps.
- Socket.IO pushes live location updates.
- All alerts and reports are timestamped.
