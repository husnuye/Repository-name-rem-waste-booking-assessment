import { useState } from "react";

type Address = {
  id: string;
  line1: string;
  city: string;
};

type Skip = {
  id?: string;
  size: string;
  price: number;
  disabled: boolean;
};

export default function App() {
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [manualSuccess, setManualSuccess] = useState("");

  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const [wasteType, setWasteType] = useState("");
  const [plasterboardOption, setPlasterboardOption] = useState("");

  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const [manualLine1, setManualLine1] = useState("");
  const [manualCity, setManualCity] = useState("");

  const [bookingId, setBookingId] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const [manualAddressesByPostcode, setManualAddressesByPostcode] = useState<
    Record<string, Address[]>
  >({});

  async function handleLookup() {
    const normalizedPostcode = postcode.trim().toUpperCase();

    setSubmitted(false);
    setLoading(true);
    setError("");
    setManualSuccess("");
    setAddresses([]);
    setSelectedAddress(null);
    setBookingSuccess(false);
    setBookingId("");
    setSelectedSkip(null);
    setWasteType("");
    setPlasterboardOption("");

    try {
      const res = await fetch("http://localhost:3001/api/postcode/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postcode: normalizedPostcode }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      const apiAddresses = data.addresses || [];
      const savedManual =
        manualAddressesByPostcode[normalizedPostcode] || [];

      setAddresses([...apiAddresses, ...savedManual]);
      setSubmitted(true);
    } catch {
      setError("Something went wrong");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  async function postWasteType(payload: {
    heavyWaste: boolean;
    plasterboard: boolean;
    plasterboardOption: string | null;
  }) {
    await fetch("http://localhost:3001/api/waste-types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  async function fetchSkips(postcodeValue: string, heavyWaste: boolean) {
    const pc = postcodeValue.replace(/\s+/g, "").toUpperCase();

    const res = await fetch(
      `http://localhost:3001/api/skips?postcode=${pc}&heavyWaste=${heavyWaste}`
    );

    const data = await res.json();
    setSkips(data.skips || []);
  }

  async function handleConfirmBooking() {
    if (!selectedSkip || confirming) return;

    try {
      setConfirming(true);

      const heavyWaste = wasteType === "heavy";
      const plasterboard = wasteType === "plasterboard";

      const res = await fetch("http://localhost:3001/api/booking/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postcode: postcode.trim().toUpperCase(),
          addressId: selectedAddress?.id,
          heavyWaste,
          plasterboard,
          skipSize: selectedSkip.size,
          price: selectedSkip.price,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error();

      setBookingId(data.bookingId);
      setBookingSuccess(true);
    } catch {
      setError("Booking failed");
    } finally {
      setConfirming(false);
    }
  }

  const vat = selectedSkip ? Math.round(selectedSkip.price * 0.2) : 0;
  const total = selectedSkip ? selectedSkip.price + vat : 0;

  return (
    <div className="page">
      {/* STEP 1 */}
      {step === 1 && (
        <div className="card">
          <h1>REM Waste Booking Flow</h1>

          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <input
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="Enter postcode"
            />
            <button onClick={handleLookup} disabled={loading}>
              Lookup
            </button>
          </div>

          {loading && <p>Loading addresses...</p>}

          {error && (
            <div style={{ marginBottom: "16px" }}>
              <p>{error}</p>
              <button onClick={handleLookup}>Retry</button>
            </div>
          )}

          {manualSuccess && (
            <p style={{ color: "green", marginBottom: "16px" }}>
              {manualSuccess}
            </p>
          )}

          {submitted && !loading && !error && addresses.length === 0 && (
            <div style={{ marginBottom: "20px" }}>
              <p>No addresses found</p>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <input
                  placeholder="Address line 1"
                  value={manualLine1}
                  onChange={(e) => setManualLine1(e.target.value)}
                />
                <input
                  placeholder="City"
                  value={manualCity}
                  onChange={(e) => setManualCity(e.target.value)}
                />
              </div>

              <div style={{ marginTop: "12px" }}>
                <button
                  onClick={() => {
                    const pc = postcode.trim().toUpperCase();

                    const addr = {
                      id: `manual-${Date.now()}`,
                      line1: manualLine1,
                      city: manualCity,
                    };

                    setManualAddressesByPostcode((prev) => ({
                      ...prev,
                      [pc]: [...(prev[pc] || []), addr],
                    }));

                    setAddresses((prev) => [...prev, addr]);
                    setManualSuccess("Address added");
                    setManualLine1("");
                    setManualCity("");
                  }}
                  disabled={!manualLine1 || !manualCity}
                >
                  Add address
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: "16px" }}>
            {addresses.map((a) => (
              <div key={a.id} style={{ marginBottom: "10px" }}>
                <button
                  onClick={() => {
                    setSelectedAddress(a);
                    setSelectedSkip(null);
                    setWasteType("");
                    setPlasterboardOption("");
                    setBookingSuccess(false);
                    setBookingId("");
                    setStep(2);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px",
                  }}
                >
                  {a.line1}, {a.city}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card">
          <h2>Select Waste Type</h2>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={async () => {
                setWasteType("general");
                setPlasterboardOption("");
                setSelectedSkip(null);
                setBookingSuccess(false);

                await postWasteType({
                  heavyWaste: false,
                  plasterboard: false,
                  plasterboardOption: null,
                });

                await fetchSkips(postcode, false);
                setStep(3);
              }}
            >
              General
            </button>

            <button
              onClick={async () => {
                setWasteType("heavy");
                setPlasterboardOption("");
                setSelectedSkip(null);
                setBookingSuccess(false);

                await postWasteType({
                  heavyWaste: true,
                  plasterboard: false,
                  plasterboardOption: null,
                });

                await fetchSkips(postcode, true);
                setStep(3);
              }}
            >
              Heavy
            </button>

            <button
              onClick={() => {
                setWasteType("plasterboard");
                setPlasterboardOption("");
                setSelectedSkip(null);
                setBookingSuccess(false);
              }}
            >
              Plasterboard
            </button>
          </div>

          {wasteType === "plasterboard" && (
            <div style={{ marginTop: "20px" }}>
              <h4>Select plasterboard handling option</h4>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button onClick={() => setPlasterboardOption("bagged")}>
                  Bagged
                </button>
                <button onClick={() => setPlasterboardOption("sheeted")}>
                  Sheeted
                </button>
                <button onClick={() => setPlasterboardOption("mixed")}>
                  Mixed
                </button>
              </div>

              {plasterboardOption && (
                <div style={{ marginTop: "15px" }}>
                  <p>Selected option: {plasterboardOption}</p>

                  <button
                    onClick={async () => {
                      setSelectedSkip(null);
                      setBookingSuccess(false);

                      await postWasteType({
                        heavyWaste: false,
                        plasterboard: true,
                        plasterboardOption,
                      });

                      await fetchSkips(postcode, false);
                      setStep(3);
                    }}
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setStep(1)}>Back</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="card">
          <h2>Select Skip</h2>

          <div style={{ marginTop: "16px" }}>
            {skips.map((s) => (
              <div key={s.id || s.size} style={{ marginBottom: "10px" }}>
                <button
                  disabled={s.disabled}
                  onClick={() => {
                    setSelectedSkip(s);
                    setBookingSuccess(false);
                    setBookingId("");
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px",
                    opacity: s.disabled ? 0.5 : 1,
                  }}
                >
                  {s.size} - £{s.price}
                  {s.disabled && " (not allowed)"}
                </button>
              </div>
            ))}
          </div>

          {selectedSkip && (
            <div style={{ marginTop: "20px" }}>
              <h3>Review</h3>
              <p>
                <b>Postcode:</b> {postcode.trim().toUpperCase()}
              </p>
              <p>
                <b>Address:</b> {selectedAddress?.line1}, {selectedAddress?.city}
              </p>
              <p>
                <b>Waste type:</b> {wasteType}
              </p>
              {wasteType === "plasterboard" && (
                <p>
                  <b>Handling:</b> {plasterboardOption}
                </p>
              )}
              <p>
                <b>Skip:</b> {selectedSkip.size}
              </p>

              <h4>Price breakdown</h4>
              <p>
                <b>Base price:</b> £{selectedSkip.price}
              </p>
              <p>
                <b>VAT (20%):</b> £{vat}
              </p>
              <p>
                <b>Total:</b> £{total}
              </p>

              <button onClick={handleConfirmBooking} disabled={confirming}>
                {confirming ? "Confirming..." : "Confirm Booking"}
              </button>
            </div>
          )}

          {bookingSuccess && (
            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h3>Booking confirmed successfully</h3>
              <p>
                <b>ID:</b> {bookingId}
              </p>
            </div>
          )}

          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setStep(2)}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}