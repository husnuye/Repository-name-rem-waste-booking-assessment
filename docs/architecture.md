rem-waste-booking-assessment/
├── README.md
├── manual-tests.md
├── bug-reports.md
├── package.json
├── .gitignore
├── apps/
│   ├── ui/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── index.html
│   │   ├── public/
│   │   │   └── screenshots/
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── app/
│   │       │   ├── router.tsx
│   │       │   └── constants.ts
│   │       ├── components/
│   │       │   ├── StepLayout.tsx
│   │       │   ├── PostcodeForm.tsx
│   │       │   ├── AddressSelect.tsx
│   │       │   ├── WasteTypeForm.tsx
│   │       │   ├── PlasterboardOptions.tsx
│   │       │   ├── SkipGrid.tsx
│   │       │   ├── ReviewCard.tsx
│   │       │   ├── LoadingState.tsx
│   │       │   ├── EmptyState.tsx
│   │       │   ├── ErrorState.tsx
│   │       │   └── PriceBreakdown.tsx
│   │       ├── pages/
│   │       │   ├── BookingFlowPage.tsx
│   │       │   └── ConfirmationPage.tsx
│   │       ├── services/
│   │       │   ├── apiClient.ts
│   │       │   ├── postcodeService.ts
│   │       │   ├── wasteService.ts
│   │       │   ├── skipService.ts
│   │       │   └── bookingService.ts
│   │       ├── state/
│   │       │   ├── bookingStore.ts
│   │       │   └── bookingTypes.ts
│   │       ├── hooks/
│   │       │   ├── usePostcodeLookup.ts
│   │       │   ├── useSkipOptions.ts
│   │       │   └── useBookingSubmission.ts
│   │       ├── utils/
│   │       │   ├── normalizePostcode.ts
│   │       │   ├── price.ts
│   │       │   └── validators.ts
│   │       └── styles/
│   │           └── global.css
│   └── api/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── server.ts
│           ├── app.ts
│           ├── routes/
│           │   ├── postcode.ts
│           │   ├── wasteTypes.ts
│           │   ├── skips.ts
│           │   └── booking.ts
│           ├── controllers/
│           │   ├── postcodeController.ts
│           │   ├── wasteController.ts
│           │   ├── skipController.ts
│           │   └── bookingController.ts
│           ├── services/
│           │   ├── postcodeService.ts
│           │   ├── skipService.ts
│           │   └── bookingService.ts
│           ├── fixtures/
│           │   ├── addresses.ts
│           │   ├── skips.ts
│           │   └── bookings.ts
│           ├── utils/
│           │   ├── delay.ts
│           │   ├── normalizePostcode.ts
│           │   └── errors.ts
│           └── types/
│               └── api.ts
├── automation/
│   ├── package.json
│   ├── playwright.config.ts
│   ├── tests/
│   │   ├── booking-general.spec.ts
│   │   └── booking-heavy.spec.ts
│   ├── pages/
│   │   ├── bookingPage.ts
│   │   └── reviewPage.ts
│   ├── fixtures/
│   │   └── testData.ts
│   └── utils/
│       └── selectors.ts
├── docs/
│   ├── architecture.md
│   ├── api-contract.md
│   ├── accessibility-report.md
│   ├── lighthouse-report.md
│   └── submission-checklist.md
└── media/
    ├── desktop.png
    ├── mobile.png
    ├── error-state.png
    ├── retry-state.png
    └── flow-demo.mp4