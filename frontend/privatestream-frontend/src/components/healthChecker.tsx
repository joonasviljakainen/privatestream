import React, { useEffect, useState } from "react";
import { getHealth } from "../utils/backendutils";

export const HealthChecker = () => {
  const [loading, setLoading] = useState(false);
  const [healthy, setHealthy] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!loading && healthy === undefined) {
      setLoading(true);
      getHealth()
        .then((res: any) => {
          console.log(res);
          setHealthy(true);
        })
        .catch((err: any) => {
          console.log(err);
          setHealthy(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);
  return (
    <div>
      <h2>Health check</h2>
      <p>
        {loading
          ? "Loading..."
          : healthy === false
          ? "Health check failed"
          : healthy === true
          ? "Connection success"
          : "Uknown error, see console"}
      </p>
    </div>
  );
};
