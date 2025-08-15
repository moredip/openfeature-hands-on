import { OpenFeature } from "@openfeature/server-sdk";
import { FliptProvider } from "@openfeature/flipt-provider";

export default function defineNitroPlugin() {
  console.log("Configuring OpenFeature with Flipt node provider...");

  const provider = new FliptProvider("default", {
    url: "http://localhost:8002",
  });
  OpenFeature.setProvider(provider);
}
