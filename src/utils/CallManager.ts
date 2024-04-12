import { setOtherUserId } from "../store/call";
import store from "../store";
import { RootState } from "../interfaces";

interface CallMedia {
  video?: HTMLVideoElement;
  audio?: HTMLAudioElement;
}

export type MediaType = "video" | "audio";

export default class CallManager {
  private static store = store;
  private static media?: CallMedia;

  static cleanup = () => this.endCall();

  static stopMediaTracks = () => {
    const source = this.media?.audio?.srcObject || this.media?.video?.srcObject;
    if (source) {
      // @ts-expect-error unkown
      const tracks = source.getTracks();
      tracks.forEach((track) => track.stop());
      this.media = undefined;
    }
  };

  static createMedia = (media: CallMedia) => (this.media = media);

  static addStreamToMedia = (type: MediaType, stream: MediaStream) => {
    if (this.media && this.media[type]) {
      // @ts-expect-error No idea
      this.media[type].srcObject = stream;
    }
  };

  static startCall = (id) => this.store.dispatch(setOtherUserId(id));

  static endCall = () => {
    const otherUserId = (this.store?.getState() as RootState)?.call
      ?.otherUserId;

    if (otherUserId) {
      this.stopMediaTracks();
      this.store.dispatch(setOtherUserId(undefined));
    } else {
      console.error("No active call");
    }
  };
}
