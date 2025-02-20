
import { useState, useEffect } from "react";

const checkFileExists = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    console.log(response);
    return true;
  } catch (error) {
    return false;
  }
};

const Checkpdf = ({ pdfUrl }) => {
  const [exists, setExists] = useState(null);

  useEffect(() => {
    checkFileExists(pdfUrl).then(setExists);
  }, [pdfUrl]); // ทำงานใหม่เมื่อ pdfUrl เปลี่ยน

  return <>{exists === null ? "Loading..." : exists ? "✅ มีไฟล์" : "❌ ไม่มีไฟล์"}</>;
};
export default Checkpdf;
