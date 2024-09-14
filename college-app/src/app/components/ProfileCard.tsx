import React, { useState } from "react";

interface ProfileCardProps {
  image: string;
  name: string;
  degrees: string;
  content: string;
  social: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  name,
  degrees,
  content,
  social,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative inline-block cursor-pointer w-72 bg-gray-100 rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "h-[20rem]" : "h-48"
      } ${!isOpen ? "hover:h-[20rem]" : ""}`}
      onClick={handleClick}
    >
      <div className="h-24 bg-blue-500 transition-all duration-500 ease-in-out" />
      <div
        className={`w-20 h-24 rounded-full bg-gray-200 border-4 border-gray-200 -mt-16 mx-auto overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "scale-110" : "scale-100"
        }`}
      >
        <img src={image} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <div className="px-4 text-gray-800 transition-all duration-500 ease-in-out flex flex-col justify-center items-center">
        <h3 className="text-lg font-semibold mt-2 text-center text-blue-500">
          {name}
        </h3>
        <h4 className="text-md font-semibold mt-1 text-center text-black">
          {degrees}
        </h4>
        <p className="text-sm mt-2 text-center">{content}</p>
      </div>
      <div
        className={
          "text-3xl flex justify-center space-x-4 mt-4 text-blue-500 transition-all duration-500 ease-in-out "
        }
      >
        {social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook"></i>
          </a>
        )}
        {social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-twitter"></i>
          </a>
        )}
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
