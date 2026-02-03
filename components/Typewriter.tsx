import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
    className?: string;
}

export const Typewriter = ({
    words,
    typingSpeed = 150,
    deletingSpeed = 50,
    pauseTime = 2000,
    className = ""
}: TypewriterProps) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex];
        let timer: NodeJS.Timeout;

        if (isDeleting) {
            timer = setTimeout(() => {
                setCurrentText(word.substring(0, currentText.length - 1));
                if (currentText.length === 0) {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }, deletingSpeed);
        } else {
            timer = setTimeout(() => {
                setCurrentText(word.substring(0, currentText.length + 1));
                if (currentText.length === word.length) {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

    return (
        <span className={className}>
            {currentText}
            <span className="animate-pulse">|</span>
        </span>
    );
};
