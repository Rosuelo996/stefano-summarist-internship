"use client";

import { useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoginPrompt from "../../../components/shared/LoginPrompt";

function Settings() {
  const user = useSelector((state: any) => state.auth.user);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSubscription() {
      if (!user) {
        setSubscription(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const ref = collection(db, "customers", user.uid, "subscriptions");
      const snapshot = await getDocs(ref);

      const doc = snapshot.docs[0];

      if (doc) {
        setSubscription(doc.data());
      } else {
        setSubscription(null);
      }

      setIsLoading(false);
    }

    getSubscription();
  }, [user]);

  let planName = "Basic";

  if (
    subscription &&
    (subscription.status === "active" || subscription.status === "trialing")
  ) {
    const planId = subscription.items[0].plan.id;

    if (planId === "price_1TJKZCH4YwsQgJ87wCwodNvv") {
      planName = "Premium Plus";
    } else if (planId === "price_1TIy9SH4YwsQgJ87cCW9plV9") {
      planName = "Premium";
    }
  }

  return (
    <div id="settings">
      <div className="container">
        <div className="row">
          <div className="section__title page__title">Settings</div>
          {!user ? (
            <LoginPrompt />
          ) : isLoading ? (
            <>
              <div className="settings__content">
                <div className="settings__subtitle">Your Subscription Plan</div>
                <div className="settings__text">
                  <div className="skeleton settings__text-skeleton"></div>
                </div>

                <div className="skeleton settings__btn-skeleton"></div>
              </div>

              <div className="settings__content">
                <div className="settings__subtitle">Email</div>
                <div className="settings__text">
                  <div className="skeleton settings__text-skeleton long"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="settings__content">
                <div className="settings__subtitle">Your Subscription Plan</div>
                <div className="settings__text">{planName}</div>
                {planName === "Basic" && (
                  <a href="/choose-plan" className="btn settings__upgrade--btn">
                    Upgrade to Premium
                  </a>
                )}
              </div>
              <div className="settings__content">
                <div className="settings__subtitle">Email</div>
                <div className="settings__text">{user?.email}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
