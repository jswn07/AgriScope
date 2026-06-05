import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore"

import { db } from "./firebase"

export async function savePrediction(data) {
  await addDoc(
    collection(db, "predictions"),
    data
  )
}

export async function saveChat(data) {
  await addDoc(
    collection(db, "chatHistory"),
    data
  )
}

export async function getUserPredictions(userId) {
  const q = query(
    collection(db, "predictions"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
}

export async function getUserChats(userId) {
  const q = query(
    collection(db, "chatHistory"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )

  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
}