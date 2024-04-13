import { setOtherUserId } from "../store/call";
import store from "../store";
import { RootState } from "../interfaces";

interface CallMedia {
  video?: HTMLVideoElement;
  audio?: HTMLAudioElement;
}

export type MediaType = "video" | "audio";

interface Streams {
  localStream?: MediaStream;
  remoteStream?: MediaStream;
}

export default class CallManager {
  private static store = store;
  private static media?: CallMedia;
  private static peerConnection?: RTCPeerConnection;
  private static callTypes = ["video", "audio"];
  private static streams: Streams = {
    localStream: undefined,
    remoteStream: undefined,
  };

  static get isCalling() {
    return this.getOtherUserId();
  }

  static createMedia = (media: CallMedia) => (this.media = media);

  static addStreamToMedia = (type: MediaType, stream: MediaStream) => {
    if (this.media && this.media[type]) {
      // @ts-expect-error No idea
      this.media[type].srcObject = stream;
      // @ts-expect-error No idea
      this.media[type].volume = 0;
    }
  };

  static startCall = async (id) => this.store.dispatch(setOtherUserId(id));

  static initMedia = async () => {
    const stream = await this.getLocalStream();

    this.addStreamToMedia("video", stream);
  };

  static getLocalStream = async () => {
    if (this.streams?.localStream) return this.streams.localStream;

    const stream = await this.getMediaStream();
    this.streams.localStream = stream;

    return stream;
  };

  static getMediaStream = () =>
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

  static endCall = () => {
    const otherUserId = this.getOtherUserId();

    if (otherUserId) {
      this.stopMediaTracks();
      this.clearLocalStream();

      this.store.dispatch(setOtherUserId(undefined));
    } else {
      console.error("No active call");
    }
  };

  static getOtherUserId = () =>
    (this.store?.getState() as RootState)?.call?.otherUserId;

  static clearLocalStream = () => {
    this.streams.localStream?.getTracks().forEach((track) => track.stop());
    this.streams.localStream = undefined;
  };

  static clearMediaSource = () => {
    this.callTypes.map((type) => {
      if (this.media && this.media[type]) {
        this.media[type].srcObject = undefined;
      }
    });
    this.media = undefined;
  };

  static cleanup = () => this.endCall();

  static getMediaSource = () =>
    this.media?.audio?.srcObject || this.media?.video?.srcObject;

  static stopMediaTracks = () => {
    const source = this.getMediaSource();

    if (source) {
      // @ts-expect-error unkown
      const tracks = source.getTracks();
      tracks.forEach((track) => track.stop());
      this.clearMediaSource();
    }
  };
}
