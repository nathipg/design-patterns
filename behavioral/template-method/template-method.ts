abstract class VideoDownloader {
  // Algorithm skeleton
  public run(name: string): void {
    this.searchVideo(name);
    this.extractLink();
    this.registerData();
    this.onBeforeDownload();
    this.downloadVideo();
    this.onAfterDownload();
    this.updateVideoStatus();
  }

  // Need to be implemented in subclasses
  protected abstract searchVideo(name: string): void;

  // Need to be implemented in subclasses
  protected abstract extractLink(): void;

  // Default implementation
  protected registerData(): void {
    console.log('Save video data at the database with IN_PROGRESS status');
  }

  // Hooks
  protected onBeforeDownload(): void {}

  // Default implementation
  protected downloadVideo(): void {
    console.log('Downloading video...');
  }

  // Hooks
  protected onAfterDownload(): void {}

  // Default implementation
  protected updateVideoStatus(): void {
    console.log('Update video status at the database to FINISHED');
  }
}

class YouTubeVideoDownloader extends VideoDownloader {
  protected searchVideo(name: string): void {
    console.log(`Specific code to search "${name}" video in YouTube structure`);
  }

  protected extractLink(): void {
    console.log('Specific code to extract video URL in YouTube structure');
  }
}

class VimeoVideoDownloader extends VideoDownloader {
  protected searchVideo(name: string): void {
    console.log(`Specific code to search "${name}" video in Vimeo structure`);
  }

  protected extractLink(): void {
    console.log('Specific code to extract video URL in Vimeo structure');
  }
}

const app = (videoDownloader: VideoDownloader) => {
  videoDownloader.run('I built my own AutoGPT that makes videos');
};

const youTubeVideoDownloader = new YouTubeVideoDownloader();
const vimeoVideoDownloader = new VimeoVideoDownloader();

console.log('=== YouTube ===');
app(youTubeVideoDownloader);

console.log('\n=== Vimeo ===');
app(vimeoVideoDownloader);
