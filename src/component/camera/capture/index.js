import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { isIOS } from '../../../includes/compat';
import { stretchViewPortHeight } from '../../../includes/viewport';
import Button from '../../../common/button';

import '../../../styles/photoCapture.scss';

const PhotoCapture = ({ takePic, closePic, videoElem, pickPhoto }) => {
    const canvasElem = useRef(null);

    useEffect(() => {
        stretchViewPortHeight();
    }, []);

    const getDataURL = () => canvasElem?.current?.toDataURL('image/png') || '';

    useEffect(() => {
        const takePhoto = () => {
            const { innerWidth, innerHeight } = window;
            const context = canvasElem?.current?.getContext('2d');

            if (context) {
                context.canvas.width = innerWidth;
                context.canvas.height = innerHeight;
                context.drawImage(videoElem, 0, 0, innerWidth, innerHeight);
            }
        };
        
        if (takePic) {
            takePhoto();
            pickPhoto(getDataURL());
        }
    }, [takePic, videoElem, pickPhoto]);

    const downloadPhoto = () => {
        const dataURL = getDataURL();

        if (isIOS()) {
            window.open(dataURL, '_blank');
        } else {
            const link = document.createElement('a');
            link.download = 'download.png';
            link.href = dataURL;
            link.click();
        }
    };

    return (
        <section
            data-test="photo-capture"
            className={classNames('photo-capture', {
                hide: !takePic
            })}
        >
            <div className="inner">
                <header>
                    <Button icon="faTimes" onclick={closePic} testId="btn-close" />
                </header>
                <canvas ref={canvasElem}></canvas>
                <aside>
                    <Button icon="faTextHeight" />
                    <Button icon="faPen" />
                    <Button icon="faStickyNote" />
                    <Button icon="faCut" />
                    <Button icon="faPaperclip" />
                    <Button icon="faCropAlt" />
                    <Button icon="faStopwatch" />
                </aside>
                <footer>
                    <div className="left">
                        <Button
                            icon="faDownload"
                            label="Save"
                            onclick={downloadPhoto}
                            buttonClass="btn-download"
                        />
                        <Button icon="faExternalLinkAlt" label="Story" />
                    </div>
                    <div className="right">
                        <Button icon="faPlayCircle" label="Send To" />
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default PhotoCapture;