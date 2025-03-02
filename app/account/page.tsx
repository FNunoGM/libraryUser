"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";
import { useAuth } from "@/components/auth-context";
import { CurrentBooksTab } from "@/components/account/CurrentBooksTab";
import { BorrowingHistoryTab } from "@/components/account/BorrowingHistoryTab";
import { SubscriptionTab } from "@/components/account/SubscriptionTab";
import { getUserOrders } from "@/lib/api";
import { UserOrder } from "@/lib/types";

export default function AccountPage() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || !user.userId) return;
  }, [isLoggedIn]);

  return (
    <div className="container py-8 justify-self-center">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <Tabs defaultValue="current-books" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current-books">Current Books</TabsTrigger>
          <TabsTrigger value="history">Borrowing History</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="current-books">
          <CurrentBooksTab />
        </TabsContent>

        <TabsContent value="history">
          <BorrowingHistoryTab />
        </TabsContent>

        <TabsContent value="subscription">
          <SubscriptionTab orders={orders} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
