import "server-only";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDb } from "./firebase";

export async function createContactInquiry(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  services: string[];
  budget: string;
}) {
  await addDoc(collection(getDb(), "contactInquiries"), {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
