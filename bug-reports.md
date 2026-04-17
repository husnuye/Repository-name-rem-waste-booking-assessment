# Bug Reports — REM Waste Booking Flow

## Overview

This document lists identified defects during manual testing of the REM Waste Booking Flow application.

---

## BUG-01: Double submission issue

- **Severity:** High  
- **Priority:** High  
- **Environment:** Local (localhost:5173)  

**Precondition:**  
User is on Review step

**Steps to Reproduce:**  
1. Complete booking flow  
2. Reach Review screen  
3. Click "Confirm Booking" multiple times quickly  

**Expected Result:**  
Only one booking should be created  

**Actual Result:**  
Multiple bookings are created  

---

## BUG-02: Disabled skip selectable

- **Severity:** Medium  
- **Priority:** Medium  
- **Environment:** Local  

**Precondition:**  
Heavy waste type selected  

**Steps to Reproduce:**  
1. Select "Heavy waste"  
2. Attempt to click disabled skip  

**Expected Result:**  
Disabled skip should not be selectable  

**Actual Result:**  
Skip can still be selected  

---

## BUG-03: Retry button not working

- **Severity:** High  
- **Priority:** High  
- **Environment:** Local  

**Precondition:**  
API error triggered (postcode: BS1 4DJ)

**Steps to Reproduce:**  
1. Enter postcode BS1 4DJ  
2. Click Lookup (error occurs)  
3. Click Retry  

**Expected Result:**  
Retry should trigger API again and return data  

**Actual Result:**  
Error persists, retry does not recover  

---

## BUG-04: Error message not clearly styled

- **Severity:** Low  
- **Priority:** Low  

**Precondition:**  
API error triggered  

**Steps to Reproduce:**  
1. Trigger postcode API error  

**Expected Result:**  
Error should be clearly visible with distinct styling  

**Actual Result:**  
Error message not visually prominent  

---

## BUG-05: Success message lacks persistence

- **Severity:** Low  
- **Priority:** Low  

**Precondition:**  
Booking completed  

**Steps to Reproduce:**  
1. Complete booking  

**Expected Result:**  
Success message should remain visible long enough  

**Actual Result:**  
Message disappears too quickly  

---

## Summary

- Total bugs: 5  
- High severity: 2  
- Medium severity: 1  
- Low severity: 2  

This includes functional defects and UI/UX issues identified during testing.