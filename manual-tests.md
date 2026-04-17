# Manual Test Cases — REM Waste Booking Flow


## Overview

This document covers manual test scenarios for the REM Waste Booking Flow, including functional, negative, edge, API, state, and UI validation tests.

## Test Cases

| ID | Type | Scenario | Precondition | Test Data | Steps | Expected Result | Actual Result |
|----|------|----------|--------------|-----------|-------|-----------------|---------------|
| TC-01 | Functional | Postcode lookup success | App loaded | SW1A 1AA | Enter postcode → Lookup | 12+ addresses displayed | Pass |
| TC-02 | Functional | Address selection | Address list shown | - | Select address | Step 2 opens | Pass |
| TC-03 | Functional | General waste flow | Step 2 active | - | Select General | Skip list loads | Pass |
| TC-04 | Functional | Heavy waste flow | Step 2 active | - | Select Heavy | Disabled skips visible | Pass |
| TC-05 | Functional | Plasterboard flow | Step 2 active | - | Select Plasterboard | Options displayed | Pass |
| TC-06 | Functional | Plasterboard option select | Plasterboard selected | - | Select option → Continue | Skip list loads | Pass |
| TC-07 | Functional | Skip selection | Step 3 active | - | Select skip | Review section appears | Pass |
| TC-08 | Functional | Review data accuracy | Review visible | - | Verify selections | Data matches user input | Pass |
| TC-09 | Functional | Confirm booking | Review visible | - | Click confirm | Success message shown | Pass |
| TC-10 | Functional | Booking ID visible | Booking complete | - | Observe success | Booking ID displayed | Pass |
| TC-11 | Negative | Empty postcode | App loaded | Empty | Click Lookup | Validation prevents action | Pass |
| TC-12 | Negative | Invalid postcode | App loaded | INVALID | Lookup | Error message shown | Pass |
| TC-13 | Negative | No address selected | Address list shown | - | Skip selection | Cannot proceed | Pass |
| TC-14 | Negative | No waste selected | Step 2 active | - | Continue | Cannot proceed | Pass |
| TC-15 | Negative | No skip selected | Step 3 active | - | Confirm | Confirm disabled | Pass |
| TC-16 | Negative | Plasterboard no option | Plasterboard selected | - | Continue | Cannot proceed | Pass |
| TC-17 | Negative | Disabled skip click | Step 3 active | - | Click disabled skip | No selection | Pass |
| TC-18 | Negative | API error on lookup | App loaded | BS1 4DJ | Lookup | Error displayed | Pass |
| TC-19 | Negative | Retry functionality | Error visible | - | Click Retry | Data loads successfully | Pass |
| TC-20 | Negative | Double confirm prevention | Review visible | - | Click confirm twice | Only one booking created | Pass |
| TC-21 | Edge | Multiple addresses | App loaded | SW1A 1AA | Lookup | All addresses visible | Pass |
| TC-22 | Edge | Empty address result | App loaded | EC1A 1BB | Lookup | Manual entry UI shown | Pass |
| TC-23 | Edge | Manual address creation | Empty state | Valid | Add address | Address selectable | Pass |
| TC-24 | Edge | Latency handling | App loaded | M1 1AE | Lookup | Loading indicator visible | Pass |
| TC-25 | Edge | Back navigation | Step 3 active | - | Go back | State handled correctly | Pass |
| TC-26 | Edge | Page refresh | Mid flow | - | Refresh page | App resets safely | Pass |
| TC-27 | API | Postcode API failure | App loaded | BS1 4DJ | Lookup | Error displayed | Pass |
| TC-28 | API | Retry API success | Error state | - | Retry | Data returned | Pass |
| TC-29 | API | Skip API failure | Step 3 active | - | Simulate failure | Error handled | Pass |
| TC-30 | API | Booking API failure | Review visible | - | Confirm fail | Error shown | Pass |
| TC-31 | State | Step 1 → Step 2 | Step 1 active | - | Select address | Move to Step 2 | Pass |
| TC-32 | State | Step 2 → Step 3 | Step 2 active | - | Select waste | Move to Step 3 | Pass |
| TC-33 | State | Step 3 → Review | Step 3 active | - | Select skip | Review appears | Pass |
| TC-34 | State | Confirm transition | Review visible | - | Confirm booking | Success state shown | Pass |
| TC-35 | State | State reset on change | Step 3 active | - | Change waste type | Skip resets | Pass |
| TC-36 | UI | Error UI styling | Error triggered | - | Observe UI | Red error container visible | Pass |
| TC-37 | UI | Retry button visibility | Error triggered | - | Observe UI | Retry button visible | Pass |
| TC-38 | UI | Success UI styling | Booking complete | - | Observe UI | Green success message visible | Pass |
| TC-39 | UI | Confirm loading state | API triggered | - | Click confirm | Button disabled during request | Pass |
| TC-40 | UI | Selection highlight | Options available | - | Select item | Selected item highlighted | Pass |



## Summary

- Total test cases: 40
- Negative tests: 10+
- Edge cases: 6
- API tests: 4
- State transitions: 5
- UI validation included

This ensures full coverage of user flows, error handling, and UI behavior.