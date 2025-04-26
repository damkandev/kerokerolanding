"use client"
import Image from "next/image";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Regex to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };
  return (
    <div className="h-screen grid grid-cols-2 items-center" id="contact">
      <div className="flex justify-center">
        <Image src={"/images/chat.png"} height={653} width={556} alt="chat" className="h-[60vh] w-auto"/>
      </div>
      <div className="text-[#D3FFDD]/60 flex flex-col justify-center p-12 max-w-[40vw]">
        <p className="font-clash-display-bold text-4xl text-[#9BFFB1]">
          Contact Us
        </p>
        <p className="font-inter-regular text-lg max-w-[20vw]">
          We are waiting for you, so do not hesitate and fill out this form.
        </p>
        <form className="flex flex-col gap-4 mt-4">
          <label htmlFor="name" className="text-[#D3FFDD]">
            First and last name
          </label>
          <input
            type="text"
            placeholder="Arturo Prat"
            name="name"
            className="border focus:outline-none placeholder:text-[#9BFFB1]/40 text-[#9BFFB1] font-inter-regular border-[#9BFFB1]/40 rounded-md p-2"
          />
          <label htmlFor="pet" className="text-[#D3FFDD]">
            What do you prefer?
          </label>
          <select
            name="pet"
            id="pet"
            defaultValue={""}
            className="p-2 border border-[#9BFFB1]/40 rounded-md bg-[#030B07] focus:outline-none"
          >
            <option value="">Choose an option</option>
            <option value="Cat">🐈 Cat</option>
            <option value="Dog">🐕 Dog</option>
            <option value="Helicopter">🚁 Helicopter</option>
          </select>
          <label htmlFor="" className="text-[#D3FFDD]">
            Email
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={handleEmailChange}
            className={`border focus:outline-none placeholder:text-[#9BFFB1]/40 text-[#9BFFB1] font-inter-regular border-[#9BFFB1]/40 rounded-md p-2 ${
              isEmailValid ? "" : "border-red-500"
            }`}
          />
          {!isEmailValid && (
            <p className="font-inter-regular text-sm max-w-[20vw] text-red-500 flex">
              <CircleAlert className="mr-2" size={20} /> Enter a valid email
              address
            </p>
          )}
          <label htmlFor="" className="text-[#D3FFDD]">
            Message
          </label>
          <textarea
            placeholder="I would like to order a project and will pay $3M for it. 🥸"
            className="border focus:outline-none placeholder:text-[#9BFFB1]/40 text-[#9BFFB1] font-inter-regular border-[#9BFFB1]/40 rounded-md p-2 max-h-20"
          ></textarea>
          <Button variant="primary" className="mt-4">Send</Button>
        </form>
      </div>
    </div>
  );
}
