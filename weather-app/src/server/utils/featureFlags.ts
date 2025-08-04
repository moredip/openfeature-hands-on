import { type H3Event } from "h3";
import { OpenFeature, type Client } from "@openfeature/server-sdk";
import { useAuth } from "./auth";

export function useFeatureFlags(event: H3Event): Client {
  const client = OpenFeature.getClient();
  const currentUser = useAuth(event);
  if (currentUser) {
    client.setContext({
      targetingKey: currentUser.id,
      orgId: currentUser.orgId,
    });
  }
  return client;
}
