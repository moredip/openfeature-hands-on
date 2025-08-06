import React from "react";
import {
  OpenFeatureProvider,
  OpenFeature,
  useContextMutator,
  type Hook,
  type HookContext,
  type EvaluationDetails,
  type FlagValue,
} from "@openfeature/react-sdk";
import { FliptWebProvider } from "@openfeature/flipt-web-provider";
import { useAuth } from "./AuthContext";

const fliptProvider = new FliptWebProvider("default", {
  url: "http://localhost:8002",
});

export class DebuggingHook implements Hook {
  after(
    hookContext: HookContext,
    evaluationDetails: EvaluationDetails<FlagValue>
  ) {
    console.log(
      `debugging after hook, eval details:`,
      "flagKey:",
      evaluationDetails.flagKey,
      "value:",
      evaluationDetails.value,
      "reason:",
      evaluationDetails.reason
    );
  }
}

OpenFeature.setProvider(fliptProvider);
OpenFeature.addHooks(new DebuggingHook());

interface FeatureFlagsProviderProps {
  children: React.ReactNode;
}

export function FeatureFlagsProvider({ children }: FeatureFlagsProviderProps) {
  const { user } = useAuth();
  const { setContext } = useContextMutator();
  if (user) {
    setContext({
      targetingKey: user.id,
      orgId: user.org.id,
    });
    console.log("FF Context:", {
      targetingKey: user.id,
      orgId: user.org.id,
    });
  } else {
    setContext({
      targetingKey: "anonymous",
      orgId: null,
    });
    console.log("FF Context:", {
      targetingKey: "anonymous",
      orgId: null,
    });
  }
  return <OpenFeatureProvider>{children}</OpenFeatureProvider>;
}
