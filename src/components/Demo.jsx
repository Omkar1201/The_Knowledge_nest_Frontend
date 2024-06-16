import React, { useRef, useEffect, useState } from 'react';

function Demo() {
    const divRef = useRef(null);
    const [closediv, setclosediv] = useState(false)
    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef.current && !divRef.current.contains(event.target)) {
                // Clicked outside the div; close the div or take necessary action
                console.log('Clicked outside the div. Closing div...');
                // Example: You might want to set a state to close the div
                // setDivOpen(false);
                setclosediv(!closediv)
            }
        }

        // Add event listener to window when component mounts
        window.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closediv]);

    return (
        <div>
            <div ref={divRef} className={`${closediv ? 'flex' : 'hidden'}`} style={{ width: '200px', height: '200px', backgroundColor: 'lightblue', margin: '20px' }}>
                Click anywhere on the window to close this div.
            </div>
        </div>
    );
}

export default Demo;
