import { useState } from "react";

export default function useExample() {
  const [data, setData] = useState<string>("example");
  return { data, setData };
}
