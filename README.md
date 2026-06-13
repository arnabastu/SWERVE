# SWERVE – Vision Zero India 

An AI-powered preventive road safety platform that helps drivers understand, measure, and improve their driving behaviour through a real-time Behavioural Driving Score.

---

##  Overview

SWERVE is designed to address one of the biggest challenges in road safety: most systems focus on punishment after violations, while very few help drivers improve behaviour before accidents occur.

The platform combines behavioural driving analysis, route risk intelligence, legal awareness, and AI-assisted guidance to create a preventive road safety ecosystem for Indian roads.

---

##  Problem 

Road accidents remain one of the leading causes of death in India.

Common causes include:

* Distracted driving
* Aggressive driving
* Overspeeding
* Lack of awareness of traffic laws
* State-wise regulation differences
* Poor understanding of road safety consequences

Most current solutions focus on:

* Navigation
* Challan checking
* Post-violation enforcement

SWERVE focuses on prevention before accidents.

---

##  Core Innovation: Behavioural Driving Score

The Behavioural Driving Score is the foundation of SWERVE.

Instead of only detecting violations, the system continuously evaluates how safely a person is driving.

The score is calculated using:

* Speed variation
* Harsh braking events
* Sudden acceleration
* Phone interaction frequency
* Driving duration
* Route risk factors
* Environmental conditions

Behaviour classifications include:

* Safe Driving
* Distracted Driving
* Aggressive Driving
* Fatigue Risk

This transforms road safety from:

**Punishment After Violation**

to

**Prevention Before Accident**

---

##  Features

### Behaviour Intelligence Engine

Analyses driving patterns using smartphone sensor data and generates behavioural classifications.

### Real-Time Behavioural Driving Score

Provides a live safety score during active driving sessions.

### Route Risk Intelligence

Identifies:

* Accident-prone routes
* School zones
* High-risk segments
* Weather-related risks

### Geo-Fenced Law Engine

Displays location-specific traffic laws and regulations.

### AI Legal & Safety Assistant

Provides:

* Traffic law explanations
* Fine information
* Safety guidance
* State-specific legal awareness

Supports English and Hinglish.

### Why This Law Exists

Explains the reasoning and safety impact behind traffic regulations.

### State Border Alerts

Notifies users when regulations change across state boundaries.

### Post-Drive Behaviour Report

Provides:

* Final score
* Behaviour classification
* Driving insights
* Improvement recommendations

### Offline Mode

Core safety functions remain available without internet access.

---

##  System Architecture

```text
User Starts Drive
        ↓
Sensor Data Collection
        ↓
Feature Extraction
        ↓
Behaviour Classification Model
        ↓
Behavioural Driving Score
        ↓
Risk Assessment
        ↓
Safety Intervention
        ↓
Post-Drive Report
```

---

## Behaviour Analysis Inputs

The system uses smartphone sensors to analyse:

### GPS

* Speed
* Route tracking

### Accelerometer

* Harsh braking
* Sudden acceleration

### Gyroscope

* Driving stability
* Sharp turns

### Screen Activity

* Phone interaction frequency
* Distraction estimation

---

## 🛠 Technology Stack

### Frontend

* Flutter

### Maps

* Mapbox

### Local Storage

* Hive

### Behaviour Intelligence Model

* TensorFlow Lite

### AI Assistant

* Gemini API

### Sensor Access

* sensors_plus
* geolocator

---

## 📱 Main Screens

### Home Dashboard

Displays:

* Behavioural Driving Score
* Active Risk Factors
* Driving State
* Safety Alerts

### Route Risk Page

Displays:

* Route Risk Score
* Blackspots
* Risk Zones
* Safety Recommendations

### AI Assistant Page

Provides:

* Legal Assistance
* Safety Guidance
* Behaviour Insights

---

##  Privacy First

DriveLegal follows a local-first architecture.

* Sensor data remains on the device.
* Behaviour analysis runs locally.
* No continuous sensor streaming to the cloud.
* Cloud AI is used only for conversational assistance and explanations.

---

##  Expected Impact

DriveLegal aims to:

* Reduce distracted driving
* Improve road safety awareness
* Encourage safer driving habits
* Reduce repeat traffic violations
* Improve understanding of traffic laws
* Support Vision Zero road safety objectives

---

##  Future Scope

* Android Auto Integration
* Smartwatch Support
* Fleet Monitoring
* Insurance Risk Analytics
* Government Data Integration
* Advanced Behaviour Intelligence Models

---


Road safety should not begin after an accident.

It should begin before one happens.

By combining behavioural intelligence, legal awareness, and preventive interventions, DriveLegal aims to create a safer driving ecosystem for India.
