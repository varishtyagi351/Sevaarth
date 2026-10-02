import React, { useState, useEffect } from "react";
import { CheckCircle2, CreditCard, Landmark, Loader2, Smartphone, X } from "lucide-react";
import { inr, useCart } from "@/lib/cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Step = "details" | "razorpay" | "success";
type PayMethod = "razorpay" | "cod";
type RzpTab = "upi" | "card" | "netbanking";

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
}

export function Checkout({ open, onClose }: CheckoutProps) {
  const { total, clear, setCartOpen } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [method, setMethod] = useState<PayMethod>("razorpay");
  const [tab, setTab] = useState<RzpTab>("upi");
  const [paying, setPaying] = useState(false);
  const [orderId, setOrderId] = useState("SEV-8942");
  const [amount, setAmount] = useState(0);

  // Delivery form state
  const [form, setForm] = useState({
    name: "",
    address: "",
    pincode: "",
    phone: "",
  });

  // Razorpay demo input states
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("HDFC Bank");

  // Lock background scroll & handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        closeAll();
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) return null;

  const handleInputChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const finish = () => {
    setOrderId(`SEV-${Math.floor(1000 + Math.random() * 8999)}`);
    setAmount(total);
    setStep("success");
    clear();
  };

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.address.trim() || form.pincode.trim().length !== 6 || form.phone.trim().length !== 10) {
      toast.error("Please enter a valid name, complete address, 6-digit PIN, and 10-digit phone number.");
      return;
    }

    if (method === "cod") {
      finish();
      return;
    }

    setAmount(total);
    setStep("razorpay");
  };

  const closeAll = () => {
    onClose();
    setStep("details");
    setPaying(false);
    setForm({ name: "", address: "", pincode: "", phone: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4">
      {/* Modal Container */}
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all sm:max-h-[85vh]">
        
        {/* Step 1: Details & Address */}
        {step === "details" && (
          <form onSubmit={submitDetails} className="flex flex-col overflow-y-auto p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Checkout</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Demo store — no live transactions are billed.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close checkout"
                onClick={closeAll}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 sm:space-y-4">
              <Field
                label="Full name"
                value={form.name}
                onChange={handleInputChange("name")}
                placeholder="Varish Tyagi"
                required
              />
              <Field
                label="Delivery address"
                value={form.address}
                onChange={handleInputChange("address")}
                placeholder="House no., street, landmark, city"
                required
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <Field
                  label="Pincode"
                  value={form.pincode}
                  onChange={handleInputChange("pincode")}
                  placeholder="201301"
                  inputMode="numeric"
                  maxLength={6}
                  required
                />
                <Field
                  label="Phone number"
                  value={form.phone}
                  onChange={handleInputChange("phone")}
                  placeholder="9876543210"
                  inputMode="tel"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <fieldset className="mt-5 border-t border-border pt-4">
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Select Payment Mode
              </legend>
              <div className="mt-2.5 space-y-2.5">
                <PayOption
                  active={method === "razorpay"}
                  onClick={() => setMethod("razorpay")}
                  title="Pay Online with Razorpay"
                  desc="UPI · Debit/Credit Cards · NetBanking"
                />
                <PayOption
                  active={method === "cod"}
                  onClick={() => setMethod("cod")}
                  title="Cash on Delivery (COD)"
                  desc="Pay cash or UPI at your doorstep"
                />
              </div>
            </fieldset>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-primary py-3 text-center text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.99] sm:py-3.5 sm:text-sm"
            >
              {method === "cod" ? "Place COD Order" : `Proceed to Pay ${inr(total)}`}
            </button>
          </form>
        )}

        {/* Step 2: Simulated Razorpay Gateway */}
        {step === "razorpay" && (
          <div className="flex flex-col overflow-y-auto">
            {/* Gateway Header */}
            <div className="flex items-center justify-between bg-[#0c2340] px-5 py-4 text-white">
              <div>
                <p className="text-base font-bold tracking-tight sm:text-lg">Razorpay Checkout</p>
                <p className="text-xs text-slate-300">Sevaarth Organics · Secured Simulation</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-300">Amount</p>
                <p className="text-base font-bold text-emerald-400 sm:text-lg">{inr(amount)}</p>
              </div>
            </div>

            {/* Gateway Payment Options Tab */}
            <div className="flex border-b border-border bg-muted/40">
              {(
                [
                  { id: "upi", label: "UPI", icon: Smartphone },
                  { id: "card", label: "Cards", icon: CreditCard },
                  { id: "netbanking", label: "NetBanking", icon: Landmark },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all sm:text-sm",
                    tab === t.id
                      ? "border-b-2 border-primary bg-background font-bold text-primary"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  <t.icon className="h-4 w-4" /> {t.label}
                </button>
              ))}
            </div>

            {/* Gateway Payment Form Fields */}
            <div className="space-y-4 p-5 sm:p-6">
              {tab === "upi" && (
                <div className="space-y-3">
                  <Field
                    label="Virtual Payment Address (UPI ID)"
                    placeholder="username@okaxis / mobile@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <p className="text-[11px] text-muted-foreground">
                    A collect request will be simulated on your mobile banking app.
                  </p>
                </div>
              )}

              {tab === "card" && (
                <div className="space-y-3">
                  <Field
                    label="Card Number"
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      label="Expiry (MM/YY)"
                      placeholder="12/28"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      maxLength={5}
                    />
                    <Field
                      label="CVV"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      type="password"
                      maxLength={4}
                    />
                  </div>
                </div>
              )}

              {tab === "netbanking" && (
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Select Popular Bank
                    </span>
                    <select
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra">Kotak Mahindra Bank</option>
                    </select>
                  </label>
                </div>
              )}

              <button
                type="button"
                disabled={paying}
                onClick={() => {
                  setPaying(true);
                  setTimeout(finish, 1500);
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-75 sm:text-sm"
              >
                {paying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing Payment…</span>
                  </>
                ) : (
                  `Authorize & Pay ${inr(amount)}`
                )}
              </button>

              <button
                type="button"
                disabled={paying}
                onClick={() => setStep("details")}
                className="w-full text-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Cancel and return to shipping details
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === "success" && (
          <div className="flex flex-col items-center p-6 text-center sm:p-8">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 dark:bg-emerald-950/50">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>

            <h2 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">Order Confirmed! 🎉</h2>
            <p className="mt-1.5 max-w-sm text-xs text-muted-foreground sm:text-sm">
              Thank you for ordering with Sevaarth. Your package is prepared for dispatch within 24 hours.
            </p>

            <div className="mt-5 rounded-full border border-border bg-muted/60 px-5 py-2">
              <span className="text-xs text-muted-foreground">Tracking ID: </span>
              <span className="text-xs font-bold text-primary sm:text-sm">#{orderId}</span>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              Total Settled: <strong className="text-foreground">{inr(amount)}</strong> (
              {method === "cod" ? "Cash on Delivery" : "Prepaid Online"}
              )
            </div>

            <button
              type="button"
              onClick={() => {
                closeAll();
                setCartOpen(false);
              }}
              className="mt-6 w-full rounded-full bg-primary py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg sm:text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// Reusable Form Input Field
function Field({
  label,
  className,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-left">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        className={cn(
          "mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary",
          className
        )}
      />
    </label>
  );
}

// Reusable Payment Option Card
function PayOption({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all sm:p-4",
        active
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border hover:bg-muted/40"
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors",
          active ? "border-primary" : "border-muted-foreground"
        )}
      >
        {active && <span className="h-2 w-2 rounded-full bg-primary" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{desc}</span>
      </span>
    </button>
  );
}

export default Checkout;