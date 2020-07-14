import React, { useState, useRef, useEffect, useCallback } from 'react';
import { promise } from '../../includes/system';
import { playSound } from '../../includes/audio';
import Button from '../../common/button';
import classNames from 'classnames';

import Header from '../header/index.js';
import PhotoCapture from './capture/index';

import '../../styles/camera.scss';

const SET_PHOTO = 'camera/setPhoto';
const TOGGLE_CAMERA_MODE = 'camera/toggleCameraMode';

const Camera = () => {
    const videoElem = useRef(null);
    const audioElem = useRef(null);

    const [takePic, setTakePic] = useState(false);
    const [notSupported, setNotSupported] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const [cameraMode, setCameraMode] = useState();

    const startCamera = useCallback(async () => {
        const navigator = window.navigator;
        const maxWidth = (document.querySelector('#wrapper'))?.offsetWidth;
    
        if (!('mediaDevices' in navigator)) navigator.mediaDevices = {};
        if (!('getUserMedia' in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = (constraints) => {
            const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia)
                return Promise.reject(new Error('getUserMedia() is not implemented!'));
            else
                return new Promise((resolve, reject) =>
                    getUserMedia.call(navigator, constraints, resolve, reject)
                );
            };
        }
    
        const [error, response] = await promise(
            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: cameraMode,
                    width: { ideal: maxWidth }
                }
            })
        );
    
        if (!error && videoElem.current) {
            videoElem.current.srcObject = response;
            setCameraStream(response);
        } else {
            setNotSupported(true);
        }
    }, [cameraMode]);
    
    useEffect(() => {
        startCamera();
    }, [startCamera]);

    const pickPhoto = (dataURL) => (dispatch) =>
        dispatch({ type: SET_PHOTO, dataURL });

    const toggleCameraMode = () => {
        setCameraMode(cameraMode === 'user' ? 'environment' : 'user');
    };

    return (
        <main className="camera">
            <Header toggleCameraMode={toggleCameraMode} />

            {notSupported && (
                <div className="not-supported">
                    <p>
                    <span role="img" aria-label="crying emoji">
                        😭
                    </span>{' '}
                    Unfortunately your browser doesn't support the getUserMedia API used by the
                    camera, please try another browser!
                    </p>
                </div>
            )}

            <video
                ref={videoElem}
                muted
                playsInline
                autoPlay
                className={classNames('video-stream', {
                    hide: takePic
                })}
            ></video>

            <PhotoCapture
                takePic={takePic}
                closePic={() => setTakePic(false)}
                videoElem={videoElem.current}
                pickPhoto={pickPhoto}
            />

            <section className="controls">
                <Button
                    icon="faCircle"
                    buttonClass="btn-capture"
                    testId="btn-capture-main"
                    onclick={() => {
                        if (notSupported) return;
                        setTakePic(true);
                        if (audioElem.current) playSound('cameraShutter', audioElem.current);
                    }}
                />
            </section>

            <audio ref={audioElem} className="app-sound"></audio>
        </main>
    );
};

export default Camera;