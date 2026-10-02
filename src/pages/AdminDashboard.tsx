import React, { useState, useEffect } from "react";
import { useUserRole } from "@/lib/useUserRole";
import { supabase } from "@/lib/supabase";
import { 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  ShieldCheck, 
  AlertOctagon, 
  Plus, 
  Trash2, 
  UploadCloud, 
  X,
  Loader2,
  ArrowLeft 
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  const { isAdmin, isLoaded, user } = useUserRole();
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "messages">("products");

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // New Product Form State
  const [isAdding, setIsAdding] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    mrp: "",
    weight: "250g",
    tag: "Best Seller",
  });

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
      fetchMessages();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to fetch products");
    else setProducts(data || []);
    setLoading(false);
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setOrders(data || []);
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setMessages(data || []);
  };

  // Image File Select & Preview Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size 5MB se kam honi chahiye");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // Add Product & Supabase Storage Upload Handler
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Kripya product image upload karein");
      return;
    }

    try {
      setUploading(true);

      // 1. Supabase Storage me Unique File Name ke sath Upload
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `items/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // 2. Uploaded Image ka Public URL generate karein
      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(filePath);

      const finalImageUrl = publicUrlData.publicUrl;

      // 3. Database Table me record insert karein
      const { error: dbError } = await supabase.from("products").insert([
        {
          name: formData.name,
          price: parseFloat(formData.price),
          mrp: formData.mrp ? parseFloat(formData.mrp) : null,
          weight: formData.weight,
          image: finalImageUrl,
          tag: formData.tag,
        },
      ]);

      if (dbError) throw new Error(dbError.message);

      toast.success("Product image ke sath successfully add ho gaya!");
      setIsAdding(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setFormData({ name: "", price: "", mrp: "", weight: "250g", tag: "Best Seller" });
      fetchProducts();
    } catch (err: any) {
      toast.error(err.message || "Failed to add product");
    } finally {
      setUploading(false);
    }
  };

  // Delete Product Handler
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error("Failed to delete product");
    else {
      toast.success("Product removed");
      fetchProducts();
    }
  };

  if (!isLoaded) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-sm">Checking credentials...</div>;
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertOctagon className="h-8 w-8" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-foreground">Access Restricted</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Aapka account ({user?.primaryEmailAddress?.emailAddress}) normal user hai. Admin access ke liye Clerk metadata update karein.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Store
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <header className="border-b border-border bg-card px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">Sevaarth Executive Dashboard</h1>
              <p className="text-xs text-muted-foreground">Manage pantry catalog, customer orders &amp; inquiries</p>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold shadow-sm transition-all hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" /> Exit to Store
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "products"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
            }`}
          >
            <Package className="h-4 w-4" /> Products Catalog ({products.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "orders"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
            }`}
          >
            <ShoppingBag className="h-4 w-4" /> Customer Orders ({orders.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("messages")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "messages"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
            }`}
          >
            <MessageSquare className="h-4 w-4" /> Contact Inquiries ({messages.length})
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === "products" && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Pantry Inventory &amp; Products</h2>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(!isAdding);
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" /> {isAdding ? "Cancel" : "Add New Product"}
              </button>
            </div>

            {/* Add Product Form with File Upload & Preview */}
            {isAdding && (
              <form onSubmit={handleAddProduct} className="rounded-2xl border border-border bg-card p-6 shadow-md grid gap-5 sm:grid-cols-2">
                <h3 className="sm:col-span-2 text-base font-bold text-primary">Add New Makhana Pack</h3>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Peri Peri Roasted Makhana"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="299"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">MRP (₹)</label>
                  <input
                    type="number"
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    placeholder="399"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Net Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="100g / 250g"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="Best Seller / Spicy / Organic"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>

                {/* Direct Image Upload Box */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground">Product Image Upload</label>
                  
                  {!previewUrl ? (
                    <label className="mt-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-6 cursor-pointer hover:border-primary/60 hover:bg-muted/40 transition-colors">
                      <UploadCloud className="h-8 w-8 text-primary/70" />
                      <span className="mt-2 text-xs font-semibold text-foreground">Click to upload image</span>
                      <span className="text-[11px] text-muted-foreground">PNG, JPG, WEBP (Max 5MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="mt-2 relative w-40 h-40 rounded-xl overflow-hidden border border-border group">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={handleRemoveSelectedFile}
                        className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground shadow hover:scale-105 transition-transform"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-50"
                  >
                    {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {uploading ? "Uploading & Saving..." : "Save Product to Supabase"}
                  </button>
                </div>
              </form>
            )}

            {/* Products List Grid */}
            {loading ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Loading pantry items...</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                  <div key={p.id} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div>
                      <img src={p.image} alt={p.name} className="aspect-video w-full rounded-xl object-cover bg-muted" />
                      <h3 className="mt-3 font-bold text-foreground">{p.name}</h3>
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">Weight: {p.weight} · Tag: {p.tag || "None"}</p>
                      <p className="mt-1 text-sm font-bold text-primary">₹{p.price} {p.mrp && <span className="text-xs text-muted-foreground line-through font-normal">₹{p.mrp}</span>}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-[11px] text-muted-foreground">ID: {p.id.slice(0, 8)}...</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive hover:bg-destructive/20"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CUSTOMER ORDERS */}
        {activeTab === "orders" && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-bold">Incoming Customer Orders</h2>
            {orders.length === 0 ? (
              <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">No orders received yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{o.customer_name}</span>
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">{o.status || "Pending"}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Email: {o.email} · Phone: {o.phone || "N/A"}</p>
                      <p className="text-xs text-muted-foreground">Address: {o.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-primary">₹{o.total_amount}</p>
                      <p className="text-[10px] text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTACT INQUIRIES */}
        {activeTab === "messages" && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-bold">Contact Us Form Messages</h2>
            {messages.length === 0 ? (
              <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">No contact inquiries received yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {messages.map((m) => (
                  <div key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-foreground">{m.name}</h3>
                        <span className="text-[10px] text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-primary font-medium">{m.email}</p>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground bg-muted/50 p-3 rounded-xl">{m.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;