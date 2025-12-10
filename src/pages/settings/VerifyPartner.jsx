import React, { useState, useEffect } from "react";
import { Shield, Upload, Check, X, AlertTriangle } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const VerifyPartner = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState({
    governmentId: { file: null, preview: null, status: "Not Submitted" },
    proofOfAddress: { file: null, preview: null, status: "Not Submitted" },
    proofOfInsurance: { file: null, preview: null, status: "Not Submitted" },
    vehicleRegistrationCertificate: {
      file: null,
      preview: null,
      status: "Not Submitted",
    },
  });
  const [userVerificationStatus, setUserVerificationStatus] =
    useState("Not Submitted");

  // API URL constant - update this to match your actual backend URL
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch user verification status on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await fetch(`${API_URL}/api/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const userData = await response.json();
        setUserId(userData._id);

        // Set verification status if available
        if (userData.verificationStatus) {
          setUserVerificationStatus(userData.verificationStatus);
        }

        // Set document statuses if available
        if (userData.verificationDocuments) {
          const docs = userData.verificationDocuments;
          setDocuments((prevDocs) => ({
            governmentId: {
              ...prevDocs.governmentId,
              status: docs.governmentId?.status || "Not Submitted",
              preview: docs.governmentId?.path || null, // <-- NEW, SIMPLIFIED LOGIC
            },
            proofOfAddress: {
              ...prevDocs.proofOfAddress,
              status: docs.proofOfAddress?.status || "Not Submitted",
              preview: docs.proofOfAddress?.path || null, // <-- NEW, SIMPLIFIED LOGIC
            },
            proofOfInsurance: {
              ...prevDocs.proofOfInsurance,
              status: docs.proofOfInsurance?.status || "Not Submitted",
              preview: docs.proofOfInsurance?.path || null, // <-- NEW, SIMPLIFIED LOGIC
            },
            vehicleRegistrationCertificate: {
              ...prevDocs.vehicleRegistrationCertificate,
              status:
                docs.vehicleRegistrationCertificate?.status || "Not Submitted",
              preview: docs.vehicleRegistrationCertificate?.path || null, // <-- NEW, SIMPLIFIED LOGIC
            },
          }));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        showToast(
          "Failed to load verification data. Please ensure the server is running.",
          "error"
        );
      }
    };

    fetchUserData();
  }, [navigate, showToast, API_URL]);

  useEffect(() => {
    if (userVerificationStatus === "Pending") {
      const interval = setInterval(async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/api/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const userData = await response.json();
          if (userData.verificationStatus === "Approved") {
            setUserVerificationStatus("Approved");
            showToast("You are now a verified delivery partner!", "success");
            navigate("/profile");
          }
        }
      }, 10000); // every 10 seconds

      // Stop polling after 6 minutes
      const timeout = setTimeout(() => clearInterval(interval), 6 * 60 * 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [userVerificationStatus, API_URL, navigate, showToast]);

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      showToast("Please upload a PDF or image file (JPEG, PNG)", "error");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("File size exceeds 5MB limit", "error");
      return;
    }

   // Use URL.createObjectURL for a linkable local preview
  const localPreviewUrl = URL.createObjectURL(file);

  setDocuments((prev) => ({
    ...prev,
    [docType]: {
      ...prev[docType],
      file: file,
      preview: localPreviewUrl, // Use the object URL for both images and PDFs
      status: "Not Submitted",
    },
  }));
};
  const uploadDocument = async (docType) => {
    const file = documents[docType].file;
    if (!file) {
      showToast("Please select a file to upload.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("docType", docType);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/auth/verification-document`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload document");
      }

      const data = await response.json();

      // Update state with the new URL from Cloudinary
      setDocuments((prev) => ({
        ...prev,
        [docType]: {
          file: null, // Clear the local file after successful upload
          preview: data.verificationDocuments[docType].path, // This is now a full Cloudinary URL
          status: data.verificationDocuments[docType].status,
        },
      }));
      setUserVerificationStatus(data.verificationStatus);

      showToast("Document uploaded successfully.", "success");
    } catch (error) {
      console.error("Error uploading document:", error);
      showToast(error.message || "Failed to upload document.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const checkAllDocumentsApproved = () => {
    const allApproved = Object.values(documents).every(
      (doc) => doc.status === "Approved"
    );
    if (allApproved) {
      setUserVerificationStatus("Approved");
      showToast(
        "All documents verified! You are now a verified delivery partner",
        "success"
      );
    }
  };

  const deleteDocument = async (docType) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/auth/verification-document/${docType}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      const data = await response.json();
      setDocuments((prev) => ({
        ...prev,
        [docType]: {
          file: null,
          preview: null,
          status: "Not Submitted",
        },
      }));
      setUserVerificationStatus(data.verificationStatus);
      showToast("Document deleted successfully.");
    } catch (error) {
      console.error("Error deleting document:", error);
      showToast("Failed to delete document.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDocType = (docType) => {
    switch (docType) {
      case "governmentId":
        return "Government ID";
      case "proofOfAddress":
        return "Proof of Address";
      case "proofOfInsurance":
        return "Proof of Insurance";
      case "vehicleRegistrationCertificate":
        return "Vehicle Registration Certificate";
      default:
        return docType;
    }
  };

  const handleSubmitAllDocuments = async () => {
    setIsLoading(true);

    try {
      // Submit any documents that have files but haven't been uploaded yet
      const uploadPromises = Object.entries(documents)
        .filter(
          ([_, docData]) => docData.file && docData.status === "Not Submitted"
        )
        .map(([docType]) => uploadDocument(docType));

      await Promise.all(uploadPromises);

      try {
        // Refresh user profile to get updated verification status
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/api/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserVerificationStatus(userData.verificationStatus || "Pending");

          // Show success message
          if (userData.verificationStatus === "Approved") {
            showToast("You are now a verified delivery partner!", "success");
            navigate("/profile"); // Redirect to profile page
          }
        }
      } catch (profileError) {
        console.error("Error fetching profile:", profileError);
        // For demo purposes, simulate approval
        if (process.env.NODE_ENV === "development") {
          setUserVerificationStatus("Approved");
          showToast(
            "DEMO MODE: You are now a verified delivery partner!",
            "info"
          );
        }
      }
    } catch (error) {
      console.error("Error submitting documents:", error);
      showToast(
        "Failed to submit some documents. Please try again later.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show different UI for different verification statuses
  if (userVerificationStatus === "Approved") {
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-green-700 mb-3">
            Verification Complete!
          </h2>
          <p className="text-gray-600 mb-6">
            You are now a verified delivery partner.
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-300"
          >
            Return to Profile
          </button>
        </div>
        {/* Show submitted documents */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">
            Your Submitted Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "governmentId",
              "proofOfAddress",
              "proofOfInsurance",
              "vehicleRegistrationCertificate",
            ].map((docType) => (
              <div
                key={docType}
                className="border border-blue-300 rounded-lg p-4 bg-blue-50 flex flex-col items-center"
              >
                <span className="font-medium mb-2">
                  {formatDocType(docType)}
                </span>
                {documents[docType].preview ? (
                  <div className="w-full p-4 bg-blue-100 rounded-lg text-center">
                    <p className="text-blue-800 font-medium">
                      Document Submitted
                    </p>
                    <p className="text-xs text-gray-600">
                      You can replace it by choosing a new file below.
                    </p>
                  </div>
                ) : (
                  <span className="text-gray-400">No document uploaded</span>
                )}
                {/* Allow replacing document */}
                <label className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300 mt-2">
                  Change
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, docType)}
                    accept=".jpg,.jpeg,.png,.pdf"
                    disabled={isLoading}
                  />
                </label>
                {documents[docType].file && (
                  <button
                    onClick={() => uploadDocument(docType)}
                    className="bg-green-600 text-white text-sm rounded px-3 py-1 hover:bg-green-700 transition-colors mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Uploading..." : "Upload New"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
        <Shield size={24} className="mr-2 text-blue-500" /> Verify for Delivery
        Partner
      </h2>

      {userVerificationStatus === "Pending" && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
          <AlertTriangle size={24} className="text-yellow-500 mr-3" />
          <div>
            <p className="font-medium text-yellow-700">
              Verification In Progress
            </p>
            <p className="text-yellow-600 text-sm">
              Your documents have been submitted and are being reviewed.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="p-4 border border-blue-100 rounded-lg bg-blue-50">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Verification Requirements
          </h3>
          <p className="text-gray-600">
            To become a verified delivery partner, please upload the following
            documents:
          </p>

          <ul className="mt-4 space-y-2">
            <li className="flex items-center text-gray-700">
              <Check
                size={16}
                className={`mr-2 ${
                  documents.governmentId.status === "Approved"
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
              Government-issued ID (Driver's License, Passport)
              {documents.governmentId.status === "Approved" && (
                <span className="ml-2 text-xs text-green-500">Verified</span>
              )}
            </li>
            <li className="flex items-center text-gray-700">
              <Check
                size={16}
                className={`mr-2 ${
                  documents.proofOfAddress.status === "Approved"
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
              Proof of Address (Utility Bill, Bank Statement)
              {documents.proofOfAddress.status === "Approved" && (
                <span className="ml-2 text-xs text-green-500">Verified</span>
              )}
            </li>
            <li className="flex items-center text-gray-700">
              <Check
                size={16}
                className={`mr-2 ${
                  documents.proofOfInsurance.status === "Approved"
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
              Proof of Insurance
              {documents.proofOfInsurance.status === "Approved" && (
                <span className="ml-2 text-xs text-green-500">Verified</span>
              )}
            </li>
            <li className="flex items-center text-gray-700">
              <Check
                size={16}
                className={`mr-2 ${
                  documents.vehicleRegistrationCertificate.status === "Approved"
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
              Vehicle Registration Certificate (RC)
              {documents.vehicleRegistrationCertificate.status ===
                "Approved" && (
                <span className="ml-2 text-xs text-green-500">Verified</span>
              )}
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ID Upload */}
          <div
            className={`border ${
              documents.governmentId.preview ? "border-solid" : "border-dashed"
            } border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors duration-300`}
          >
            {documents.governmentId.preview ? (
              <div className="w-full">
                <div className="relative w-full h-40 mb-4">
                  <a
                    href={documents.governmentId.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <img
                      src={
                        documents.governmentId.preview.endsWith(".pdf")
                          ? "/assets/pdf-icon.png"
                          : documents.governmentId.preview
                      }
                      alt="Government ID Preview"
                      className="w-full h-full object-contain rounded-md border"
                    />
                    <span className="absolute bottom-2 left-2 bg-white text-blue-600 px-2 py-1 rounded text-xs shadow-md">
                      Click to View
                    </span>
                  </a>
                  <button
                    onClick={() => deleteDocument("governmentId")}
                    className="absolute top-[-5px] right-[-5px] bg-red-500 text-white p-1 rounded-full shadow-lg"
                    disabled={isLoading}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Upload size={32} className="text-blue-500 mb-4" />
                <p className="text-sm text-gray-600 text-center mb-2">
                  Upload Government ID
                </p>
                <label className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "governmentId")}
                    accept=".jpg,.jpeg,.png,.pdf"
                    disabled={isLoading}
                  />
                </label>
              </>
            )}
          </div>

          {/* Address Proof Upload */}
          <div
            className={`border ${
              documents.proofOfAddress.preview
                ? "border-solid"
                : "border-dashed"
            } border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors duration-300`}
          >
            {documents.proofOfAddress.preview ? (
              <div className="w-full">
                <div className="relative w-full h-40 mb-4">
                  <a
                    href={documents.proofOfAddress.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <img
                      src={
                        documents.proofOfAddress.preview.endsWith(".pdf")
                          ? "/assets/pdf-icon.png"
                          : documents.proofOfAddress.preview
                      }
                      alt="Proof of Address Preview"
                      className="w-full h-full object-contain rounded-md border"
                    />
                    <span className="absolute bottom-2 left-2 bg-white text-blue-600 px-2 py-1 rounded text-xs shadow-md">
                      Click to View
                    </span>
                  </a>
                  <button
                    onClick={() => deleteDocument("proofOfAddress")}
                    className="absolute top-[-5px] right-[-5px] bg-red-500 text-white p-1 rounded-full shadow-lg"
                    disabled={isLoading}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Upload size={32} className="text-blue-500 mb-4" />
                <p className="text-sm text-gray-600 text-center mb-2">
                  Upload Proof of Address
                </p>
                <label className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "proofOfAddress")}
                    accept=".jpg,.jpeg,.png,.pdf"
                    disabled={isLoading}
                  />
                </label>
              </>
            )}
          </div>

          {/* Insurance Proof Upload */}
          <div
            className={`border ${
              documents.proofOfInsurance.preview
                ? "border-solid"
                : "border-dashed"
            } border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors duration-300`}
          >
            {documents.proofOfInsurance.preview ? (
              <div className="w-full">
                <div className="relative w-full h-40 mb-4">
                  <a
                    href={documents.proofOfInsurance.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <img
                      src={
                        documents.proofOfInsurance.preview.endsWith(".pdf")
                          ? "/assets/pdf-icon.png"
                          : documents.proofOfInsurance.preview
                      }
                      alt="Proof of Insurance Preview"
                      className="w-full h-full object-contain rounded-md border"
                    />
                    <span className="absolute bottom-2 left-2 bg-white text-blue-600 px-2 py-1 rounded text-xs shadow-md">
                      Click to View
                    </span>
                  </a>
                  <button
                    onClick={() => deleteDocument("proofOfInsurance")}
                    className="absolute top-[-5px] right-[-5px] bg-red-500 text-white p-1 rounded-full shadow-lg"
                    disabled={isLoading}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Upload size={32} className="text-blue-500 mb-4" />
                <p className="text-sm text-gray-600 text-center mb-2">
                  Upload Proof of Insurance
                </p>
                <label className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "proofOfInsurance")}
                    accept=".jpg,.jpeg,.png,.pdf"
                    disabled={isLoading}
                  />
                </label>
              </>
            )}
          </div>

          {/* RC Upload */}
          <div
            className={`border ${
              documents.vehicleRegistrationCertificate.preview
                ? "border-solid"
                : "border-dashed"
            } border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors duration-300`}
          >
            {documents.vehicleRegistrationCertificate.preview ? (
              <div className="w-full">
                <div className="relative w-full h-40 mb-4">
                  <a
                    href={documents.vehicleRegistrationCertificate.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <img
                      src={
                        documents.vehicleRegistrationCertificate.preview.endsWith(
                          ".pdf"
                        )
                          ? "/assets/pdf-icon.png"
                          : documents.vehicleRegistrationCertificate.preview
                      }
                      alt="Vehicle RC Preview"
                      className="w-full h-full object-contain rounded-md border"
                    />
                    <span className="absolute bottom-2 left-2 bg-white text-blue-600 px-2 py-1 rounded text-xs shadow-md">
                      Click to View
                    </span>
                  </a>
                  <button
                    onClick={() =>
                      deleteDocument("vehicleRegistrationCertificate")
                    }
                    className="absolute top-[-5px] right-[-5px] bg-red-500 text-white p-1 rounded-full shadow-lg"
                    disabled={isLoading}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Upload size={32} className="text-blue-500 mb-4" />
                <p className="text-sm text-gray-600 text-center mb-2">
                  Upload Vehicle Registration (RC)
                </p>
                <label className="bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(e, "vehicleRegistrationCertificate")}
                    accept=".jpg,.jpeg,.png,.pdf"
                    disabled={isLoading}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmitAllDocuments}
            className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-300"
            disabled={
              isLoading ||
              Object.values(documents).every(
                (doc) => !doc.file && doc.status !== "Approved"
              )}
          >
            {isLoading ? "Processing..." : "Submit for Verification"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPartner;
