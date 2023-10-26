import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import type { People } from "~/interfaces/people.type";

export const usePeopleFirestore = () => {
  const { $db } = useNuxtApp();

  const peoples = useState("counter", () => [] as People[]);

  const getPeoples = async () => {
    try {
      const querySnapshot = await getDocs(collection($db, "peoples"));

      peoples.value = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as People;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postPeople = async (people: {
    name: string;
    title: string;
    role: string;
    email: string;
  }) => {
    try {
      const docRef = await addDoc(collection($db, "peoples"), people);
      peoples.value = [...peoples.value, { id: docRef.id, ...people }];
    } catch (error) {
      console.log(error);
    }
  };

  const deletePeople = async (id: string) => {
    try {
      await deleteDoc(doc($db, "peoples", id));
      peoples.value = peoples.value.filter((people) => people.id !== id);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getPeoples,
    postPeople,
    peoples,
    deletePeople,
  };
};
