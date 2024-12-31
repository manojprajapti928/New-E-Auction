// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Registration() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     contactNo: "",
//     imageUrl: null,
//   });

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "file" ? files[0] : value,
//     }));
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (
//       !formData.username ||
//       !formData.email ||
//       !formData.password ||
//       !formData.address ||
//       !formData.city ||
//       !formData.state ||
//       !formData.country ||
//       !formData.contactNo ||
//       !formData.imageUrl
//     ) {
//       setError("All fields are required.");
//       return;
//     }

//     const formDataToSend = new FormData();
//     for (let key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post("http://localhost:3001/api/register", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 201) {
//         setSuccessMessage("Registration successful! Redirecting to login...");
//         setTimeout(() => navigate("/"), 3000);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700">
//       <form
//         onSubmit={handleSubmit}
//         className="shadow-lg shadow-black rounded-lg p-6 w-full max-w-md bg-gray-500"
//       >
//         <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
//           Registration Form
//         </h2>

//         {error && <p className="text-red-500 text-center">{error}</p>}
//         {successMessage && (
//           <p className="text-green-500 text-center">{successMessage}</p>
//         )}

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="Enter your username"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Enter your address"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">City</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             placeholder="Enter your city"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">State</label>
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             placeholder="Enter your state"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">Country</label>
//           <input
//             type="text"
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             placeholder="Enter your country"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">
//             Contact Number
//           </label>
//           <input
//             type="text"
//             name="contactNo"
//             value={formData.contactNo}
//             onChange={handleChange}
//             placeholder="Enter your contact number"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-lg font-medium text-gray-900">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             name="imageUrl"
//             onChange={handleChange}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }














// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import bgImage from "../assets/little.jpg"; // Ensure the image exists in this path

// export default function Registration() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     contactNo: "",
//     imageUrl: null,
//   });

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);

  

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "file" ? files[0] : value,
//     }));
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (
//       !formData.username ||
//       !formData.email ||
//       !formData.password ||
//       !formData.address ||
//       !formData.city ||
//       !formData.state ||
//       !formData.country ||
//       !formData.contactNo ||
//       !formData.imageUrl
//     ) {
//       setError("All fields are required.");
//       setLoading(false);
//       return;
//     }

//     const formDataToSend = new FormData();
//     for (let key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post("http://localhost:3001/api/register", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 201) {
//         setSuccessMessage("Registration successful! Redirecting to login...");
//         setTimeout(() => navigate("/"), 3000);
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError(err.response?.data?.error || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="flex justify-center items-center min-h-screen min-w-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <div className="bg-white bg-opacity-95 shadow-2xl rounded-lg overflow-hidden max-w-4xl w-full">
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           <div className="p-8 flex flex-col justify-center">
//             <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
//               Register
//             </h2>

//             {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//             {successMessage && (
//               <p className="text-green-500 text-center mb-4">{successMessage}</p>
//             )}

//             <form onSubmit={handleSubmit}>
//               {[
//                 { label: "Username", name: "username", type: "text" },
//                 { label: "Email", name: "email", type: "email" },
//                 { label: "Password", name: "password", type: "password" },
//                 { label: "Address", name: "address", type: "text" },
//                 { label: "City", name: "city", type: "text" },
//                 { label: "State", name: "state", type: "text" },
//                 { label: "Country", name: "country", type: "text" },
//                 { label: "Contact Number", name: "contactNo", type: "text" },
//               ].map((field) => (
//                 <div className="mb-4" key={field.name}>
//                   <label className="block text-gray-800 font-medium mb-2">
//                     {field.label}
//                   </label>
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     placeholder={`Enter your ${field.label.toLowerCase()}`}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//                     required
//                   />
//                 </div>
//               ))}

//               <div className="mb-6">
//                 <label className="block text-gray-800 font-medium mb-2">
//                   Upload Image
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   name="imageUrl"
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
//                 disabled={loading}
//               >
//                 {loading ? "Registering..." : "Register"}
//               </button>
//             </form>
//           </div>

//           <div
//             className="hidden md:block bg-cover bg-center"
//             style={{ backgroundImage: `url(${bgImage})` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// }

















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/little.jpg"; // Ensure the image exists in this path

export default function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    country: "",
    contactNo: "",
    imageUrl: null,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]); // Country data state
  const [countriesLoading, setCountriesLoading] = useState(true); // To track if countries are still loading

  const countrie = {
    DZ: "Algeria",
    AO: "Angola",
    BJ: "Benin",
    BW: "Botswana",
    BF: "Burkina Faso",
    BI: "Burundi",
    CV: "Cabo Verde",
    CM: "Cameroon",
    CF: "Central African Republic (the)",
    TD: "Chad",
    KM: "Comoros (the)",
    CD: "Congo (the Democratic Republic of the)",
    CG: "Congo (the)",
    CI: "Côte d'Ivoire",
    DJ: "Djibouti",
    EG: "Egypt",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    SZ: "Eswatini",
    ET: "Ethiopia",
    GA: "Gabon",
    GM: "Gambia (the)",
    GH: "Ghana",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    KE: "Kenya",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    MG: "Madagascar",
    MW: "Malawi",
    ML: "Mali",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MA: "Morocco",
    MZ: "Mozambique",
    NA: "Namibia",
    NE: "Niger (the)",
    NG: "Nigeria",
    RE: "Réunion",
    RW: "Rwanda",
    SH: "Saint Helena, Ascension and Tristan da Cunha",
    ST: "Sao Tome and Principe",
    SN: "Senegal",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SO: "Somalia",
    ZA: "South Africa",
    SS: "South Sudan",
    SD: "Sudan (the)",
    TZ: "Tanzania, the United Republic of",
    TG: "Togo",
    TN: "Tunisia",
    UG: "Uganda",
    EH: "Western Sahara*",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    AQ: "Antarctica",
    BV: "Bouvet Island",
    TF: "French Southern Territories (the)",
    HM: "Heard Island and McDonald Islands",
    GS: "South Georgia and the South Sandwich Islands",
    AF: "Afghanistan",
    AM: "Armenia",
    AZ: "Azerbaijan",
    BD: "Bangladesh",
    BT: "Bhutan",
    IO: "British Indian Ocean Territory (the)",
    BN: "Brunei Darussalam",
    KH: "Cambodia",
    CN: "China",
    GE: "Georgia",
    HK: "Hong Kong",
    IN: "India",
    ID: "Indonesia",
    JP: "Japan",
    KZ: "Kazakhstan",
    KP: "Korea (the Democratic People's Republic of)",
    KR: "Korea (the Republic of)",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic (the)",
    MO: "Macao",
    MY: "Malaysia",
    MV: "Maldives",
    MN: "Mongolia",
    MM: "Myanmar",
    NP: "Nepal",
    PK: "Pakistan",
    PH: "Philippines (the)",
    SG: "Singapore",
    LK: "Sri Lanka",
    TW: "Taiwan (Province of China)",
    TJ: "Tajikistan",
    TH: "Thailand",
    TL: "Timor-Leste",
    TM: "Turkmenistan",
    UZ: "Uzbekistan",
    VN: "Viet Nam",
    BZ: "Belize",
  };

  useEffect(() => {
    // Populate countries from the countrie object
    const countriesList = Object.keys(countrie).map((code) => ({
      code,
      country: countrie[code],
    }));
    setCountries(countriesList);
    setCountriesLoading(false); // Once countries are loaded, stop the loading indicator
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !formData.contactNo ||
      !formData.imageUrl
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:3001/api/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen min-w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-95 shadow-2xl rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Register
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-center mb-4">{successMessage}</p>
            )}

            <form onSubmit={handleSubmit}>
              {[ 
                { label: "Username", name: "username", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
                { label: "Address", name: "address", type: "text" },
                { label: "City", name: "city", type: "text" },
                { label: "State", name: "state", type: "text" },
                { label: "Contact Number", name: "contactNo", type: "text" },
              ].map((field) => (
                <div className="mb-4" key={field.name}>
                  <label className="block text-gray-800 font-medium mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    required
                  />
                </div>
              ))}

              <div className="mb-4">
                <label className="block text-gray-800 font-medium mb-2">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                >
                  <option value="">Select your country</option>
                  {countriesLoading ? (
                    <option value="">Loading countries...</option> // Show this while loading countries
                  ) : (
                    countries.map((country, index) => (
                      <option key={index} value={country.country}>
                        {country.country}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-800 font-medium mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="imageUrl"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                disabled={loading}
              >
                Register
              </button>
            </form>
          </div>

          <div
            className="hidden md:block bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}













// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Registration() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     contactNo: "",
//     imageUrl: null,
//   });

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [countries, setCountries] = useState([]);

//   // Fetch countries on component mount
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get("https://api.first.org/data/v1/countries");
//         const countryList = Object.values(response.data.data); // Extracting the countries data
//         setCountries(countryList);
//       } catch (err) {
//         setError("Failed to load countries.");
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "file" ? files[0] : value,
//     }));
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (
//       !formData.username ||
//       !formData.email ||
//       !formData.password ||
//       !formData.address ||
//       !formData.city ||
//       !formData.state ||
//       !formData.country ||
//       !formData.contactNo ||
//       !formData.imageUrl
//     ) {
//       setError("All fields are required.");
//       return;
//     }

//     const formDataToSend = new FormData();
//     for (let key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post("http://localhost:3001/api/register", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 201) {
//         setSuccessMessage("Registration successful! Redirecting to login...");
//         setTimeout(() => navigate("/"), 3000);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700">
//       <form
//         onSubmit={handleSubmit}
//         className="shadow-lg shadow-black rounded-lg p-6 w-full max-w-md bg-gray-500"
//       >
//         <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
//           Registration Form
//         </h2>

//         {error && <p className="text-red-500 text-center">{error}</p>}
//         {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">Username</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="Enter your username"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Enter your address"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">City</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             placeholder="Enter your city"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">State</label>
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             placeholder="Enter your state"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">Country</label>
//           <select
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           >
//             <option value="">Select your country</option>
//             {countries.length > 0 ? (
//               countries.map((country) => (
//                 <option key={country.country} value={country.country}>
//                   {country.country}
//                 </option>
//               ))
//             ) : (
//               <option>Loading countries...</option>
//             )}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-900 font-medium mb-2">Contact Number</label>
//           <input
//             type="text"
//             name="contactNo"
//             value={formData.contactNo}
//             onChange={handleChange}
//             placeholder="Enter your contact number"
//             className="w-full border rounded-md px-3 py-2 bg-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-lg font-medium text-gray-900">Upload Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             name="imageUrl"
//             onChange={handleChange}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }