import React from 'react';

export interface IServiceItem {
    image: string,
    title: string,
    text: string,
}

export const ServiceItem: React.FC<IServiceItem> = (props) => {
    const { image, title, text } = props
    return (
        <div className="w-[250px] bg-white py-[45px] px-[40px] rounded-[20px] text-center border border-[rgba(222,229,234,0.5)] transition-all duration-300 ease-in hover:shadow-[0_0_15px_#cbc9c9]">
            <img src={image} className="h-[55px] mx-auto object-cover" />
            <h6 className="text-[#585858] text-base leading-[26px] font-semibold capitalize mt-[10px] break-words">{title}</h6>
            <p className="text-sm mb-0">{text}</p>
        </div>
    );
}
