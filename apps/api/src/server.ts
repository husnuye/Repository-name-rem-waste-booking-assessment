import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const failedOncePostcodes = new Set<string>();

/* ROOT */
app.get("/", (_req, res) => {
  res.send("API is running");
});

/* POSTCODE LOOKUP */
app.post("/api/postcode/lookup", async (req, res) => {
  const rawPostcode = req.body?.postcode ?? "";
  const postcode = String(rawPostcode).trim().toUpperCase();

  if (!postcode) {
    return res.status(400).json({
      error: "Postcode is required",
    });
  }

  if (postcode === "M1 1AE") {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return res.json({
      postcode,
      addresses: [
        { id: "addr_m1_1", line1: "1 Market Street", city: "Manchester" },
        { id: "addr_m1_2", line1: "2 Market Street", city: "Manchester" },
      ],
    });
  }

  if (postcode === "BS1 4DJ") {
    if (!failedOncePostcodes.has(postcode)) {
      failedOncePostcodes.add(postcode);

      return res.status(500).json({
        error: "Temporary server error. Please retry.",
      });
    }

    return res.json({
      postcode,
      addresses: [
        { id: "addr_bs1_1", line1: "1 Harbour Road", city: "Bristol" },
        { id: "addr_bs1_2", line1: "2 Harbour Road", city: "Bristol" },
      ],
    });
  }

  if (postcode === "SW1A 1AA") {
    return res.json({
      postcode,
      addresses: [
        { id: "addr_1", line1: "10 Downing Street", city: "London" },
        { id: "addr_2", line1: "11 Downing Street", city: "London" },
        { id: "addr_3", line1: "12 Downing Street", city: "London" },
        { id: "addr_4", line1: "13 Downing Street", city: "London" },
        { id: "addr_5", line1: "14 Downing Street", city: "London" },
        { id: "addr_6", line1: "15 Downing Street", city: "London" },
        { id: "addr_7", line1: "16 Downing Street", city: "London" },
        { id: "addr_8", line1: "17 Downing Street", city: "London" },
        { id: "addr_9", line1: "18 Downing Street", city: "London" },
        { id: "addr_10", line1: "19 Downing Street", city: "London" },
        { id: "addr_11", line1: "20 Downing Street", city: "London" },
        { id: "addr_12", line1: "21 Downing Street", city: "London" },
      ],
    });
  }

  if (postcode === "EC1A 1BB") {
    return res.json({
      postcode,
      addresses: [],
    });
  }

  return res.status(400).json({
    error: `Invalid postcode: ${postcode}`,
  });
});

/* WASTE TYPES API */
app.post("/api/waste-types", (req, res) => {
  const { heavyWaste, plasterboard, plasterboardOption } = req.body ?? {};

  return res.json({
    ok: true,
    heavyWaste: Boolean(heavyWaste),
    plasterboard: Boolean(plasterboard),
    plasterboardOption: plasterboardOption ?? null,
  });
});

/* SKIPS API */
app.get("/api/skips", (req, res) => {
  const postcode = String(req.query.postcode ?? "").trim().toUpperCase();
  const heavyWaste =
    String(req.query.heavyWaste ?? "false").toLowerCase() === "true";

  const skips = [
    { size: "4-yard", price: 120, disabled: false },
    { size: "5-yard", price: 140, disabled: false },
    { size: "6-yard", price: 160, disabled: false },
    { size: "8-yard", price: 200, disabled: false },
    { size: "10-yard", price: 240, disabled: false },
    { size: "12-yard", price: 260, disabled: false },
    { size: "14-yard", price: 300, disabled: false },
    { size: "16-yard", price: 340, disabled: false },
  ];

  if (heavyWaste) {
    skips[5].disabled = true;
    skips[6].disabled = true;
  }

  return res.json({
    postcode,
    skips,
  });
});

/* BOOKING CONFIRM */
app.post("/api/booking/confirm", (req, res) => {
  const {
    postcode,
    addressId,
    heavyWaste,
    plasterboard,
    skipSize,
    price,
  } = req.body ?? {};

  if (!postcode || !skipSize) {
    return res.status(400).json({
      error: "postcode and skipSize are required",
    });
  }

  return res.json({
    status: "success",
    bookingId: "BK-" + Date.now(),
    postcode,
    addressId: addressId ?? null,
    heavyWaste: Boolean(heavyWaste),
    plasterboard: Boolean(plasterboard),
    skipSize,
    price: price ?? null,
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});