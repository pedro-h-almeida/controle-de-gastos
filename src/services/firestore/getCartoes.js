import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const getCartoes = async () => {
  const db = getFirestore();

  const querySnapshot = await getDocs(
    collection(db, "usuarios", "r9izMulbrCxzgh3wDsLs", "cartoes")
  );
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

  // const docRef = doc(db, "usuarios", "r9izMulbrCxzgh3wDsLs", "cartoes");
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  // const docRef = doc(db, "usuarios", "r9izMulbrCxzgh3wDsLs");

  // docRef
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Error getting document:", error);
  //   });
};

export { getCartoes };
