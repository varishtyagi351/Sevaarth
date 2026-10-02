import { useState, useEffect } from "react";
import { products as initialProducts, type Product } from "./products";

export interface OrderItem {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  items: string;
  amount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  date: string;
}

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "Unread" | "Replied";
  date: string;
}

// Initial mock data
const initialOrders: OrderItem[] = [
  {
    id: "ORD-9281",
    customerName: "Aman Singhal",
    email: "aman@gmail.com",
    phone: "+91 98765 43210",
    items: "Peri Peri Makhana (Pack of 3) x 1",
    amount: 549,
    status: "Processing",
    date: "2026-09-25",
  },
  {
    id: "ORD-9280",
    customerName: "Pooja Hegde",
    email: "pooja.h@yahoo.com",
    phone: "+91 98234 11223",
    items: "Jumbo Pink Salt (250g) x 2",
    amount: 698,
    status: "Delivered",
    date: "2026-09-24",
  },
];

const initialQueries: ContactQuery[] = [
  {
    id: "QRY-101",
    name: "Vikram Malhotra",
    email: "vikram@malhotragroup.in",
    phone: "+91 99887 66554",
    subject: "Bulk B2B Distribution Inquiry",
    message: "We want to stock Sevaarth Organic Makhana across our 14 organic supermarkets in Mumbai. Please share wholesale catalog.",
    status: "Unread",
    date: "2026-09-26",
  },
  {
    id: "QRY-102",
    name: "Sneha Kapur",
    email: "sneha.k@outlook.com",
    phone: "+91 97112 33445",
    subject: "Custom Gift Hamper Query",
    message: "Do you provide custom Diwali corporate gift packaging with assorted flavors?",
    status: "Replied",
    date: "2026-09-23",
  },
];

export function useAdminData() {
  const [productList, setProductList] = useState<Product[]>(() => {
    const saved = localStorage.getItem("sevaarth_admin_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem("sevaarth_admin_orders");
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [queries, setQueries] = useState<ContactQuery[]>(() => {
    const saved = localStorage.getItem("sevaarth_admin_queries");
    return saved ? JSON.parse(saved) : initialQueries;
  });

  useEffect(() => {
    localStorage.setItem("sevaarth_admin_products", JSON.stringify(productList));
  }, [productList]);

  useEffect(() => {
    localStorage.setItem("sevaarth_admin_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("sevaarth_admin_queries", JSON.stringify(queries));
  }, [queries]);

  // Product Actions
  const addProduct = (product: Product) => {
    setProductList((prev) => [product, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProductList((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  // Order Actions
  const updateOrderStatus = (id: string, status: OrderItem["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  // Query Actions
  const toggleQueryStatus = (id: string) => {
    setQueries((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: q.status === "Unread" ? "Replied" : "Unread" } : q))
    );
  };

  const deleteQuery = (id: string) => {
    setQueries((prev) => prev.filter((q) => q.id !== id));
  };

  return {
    productList,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    queries,
    toggleQueryStatus,
    deleteQuery,
  };
}