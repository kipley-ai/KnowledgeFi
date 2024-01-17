"use client"
import React, { useState } from 'react';
import Twitter from './twitter';
import Notion from './notion';
import Local from './local';


export default function Step2({ selectedButton }: { selectedButton: string }) {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {
                selectedButton == 'twitter' ?
                    <Twitter />
                    : selectedButton == 'notion' ?
                        isModalOpen && <Notion closeModal={closeModal} />
                        : <Local />
            }
        </>
    )
}