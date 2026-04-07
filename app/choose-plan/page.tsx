"use client";
import {
  FaFileAlt,
  FaSeedling,
  FaHandshake,
  FaChevronDown,
} from "react-icons/fa";
import Footer from "../../components/ui/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/modalSlice";
import { getCheckoutUrl } from "../../firebase/stripePayment";
import { useRouter } from "next/navigation";

function ChoosePlan() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [openIndex, setOpenIndex] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const isGuest = useSelector((state: any) => state.auth.isGuest);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user === null) return;

    if (!user) {
      router.push("/for-you");
    }
  }, [user, router]);

  function handleToggle(index: number) {
    setOpenIndex((prev: number) => (prev === index ? null : index));
  }

  async function handlePlanCheckout() {

    if (!user || isGuest) {
    dispatch(openModal("payment"));
    setIsLoading(false);
    return;
  }
    setIsLoading(true);

    let priceId: string;

    if (selectedPlan === "yearly") {
      priceId = "price_1TJKZCH4YwsQgJ87wCwodNvv";
    } else {
      priceId = "price_1TIy9SH4YwsQgJ87cCW9plV9";
    }

    try {
      const hasTrial = selectedPlan === "yearly";
      const url = await getCheckoutUrl(priceId, hasTrial);
      
      setTimeout(() => {
        window.location.assign(url);
      }, 300);

    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <div id="choose-plan">
      <div className="wrapper__full">
        <div className="plan">
          <div className="plan__header--wrapper">
            <div className="plan__header">
              <div className="plan__title">
                Get unlimited access to many amazing books to read
              </div>
              <div className="plan__subtitle">
                Turn ordinary moments into amazing learning opportunities
              </div>
              <figure className="plan__img--mask">
                <img src="/pricing-top.png" alt="" />
              </figure>
            </div>
          </div>

          <div className="row">
            <div className="container">
              <div className="plan__features--wrapper">
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <FaFileAlt size={55} />
                  </figure>
                  <div className="plan__features--text">
                    <b>Key ideas in few min</b> with many books to read
                  </div>
                </div>
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <FaSeedling size={55} />
                  </figure>
                  <div className="plan__features--text">
                    <b>3 million</b> people growing with Summarist everyday
                  </div>
                </div>
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <FaHandshake size={55} />
                  </figure>
                  <div className="plan__features--text">
                    <b>Precise recommendations</b> collections curated by
                    experts
                  </div>
                </div>
              </div>

              <div className="section__title">
                Choose the plan that fits you
              </div>
              <div
                className={`plan__card ${selectedPlan === "yearly" ? "plan__card--active" : ""}`}
                onClick={() => setSelectedPlan("yearly")}
              >
                <div className="plan__card--circle">
                  {selectedPlan === "yearly" && (
                    <div className="plan__card--dot"></div>
                  )}
                </div>
                <div className="plan__card--content">
                  <div className="plan__card--title">Premium Plus Yearly</div>
                  <div className="plan__card--price">$99.99/year</div>
                  <div className="plan__card--text">
                    7-day free trial included
                  </div>
                </div>
              </div>

              <div className="plan__card--separator">
                <div className="plan__separator">or</div>
              </div>

              <div
                className={`plan__card ${selectedPlan === "monthly" ? "plan__card--active" : ""}`}
                onClick={() => setSelectedPlan("monthly")}
              >
                <div className="plan__card--circle">
                  {selectedPlan === "monthly" && (
                    <div className="plan__card--dot"></div>
                  )}
                </div>
                <div className="plan__card--content">
                  <div className="plan__card--title">Premium Monthly</div>
                  <div className="plan__card--price">$9.99/month</div>
                  <div className="plan__card--text">No trial included</div>
                </div>
              </div>

              <div className="plan__card--cta">
                <div className="btn--wrapper">
                  <button
                    className="btn"
                    style={{ width: "300px" }}
                    onClick={handlePlanCheckout}
                    disabled={isLoading}
                  >
                    <span>
                      {isLoading ? (
                        <div className="spinner"></div>
                      ) : selectedPlan === "yearly" ? (
                        "Start your free 7-day trial"
                      ) : (
                        "Start your first month"
                      )}
                    </span>
                  </button>
                </div>
                <div className="plan__disclaimer">
                  {selectedPlan === "yearly"
                    ? "Cancel your trial at any time before it ends, and you won’t be charged."
                    : "30-day money back guarantee, no questions asked."}
                </div>
              </div>

              <div className="faq__wrapper">
                <div className="accordion__card">
                  <div
                    className="accordion__header"
                    onClick={() => handleToggle(0)}
                  >
                    <div className="accordion__title">
                      How does the free 7-day trial work?
                    </div>
                    <FaChevronDown
                      className={`accordion__icon ${openIndex === 0 ? "accordion__icon--rotate" : ""}`}
                      size={24}
                    />
                  </div>
                  <div
                    className={`collapse ${openIndex === 0 ? "show" : ""}`}
                    style={{ height: openIndex === 0 ? "150px" : "0px" }}
                  >
                    <div className="accordion__body">
                      Begin your complimentary 7-day trial with a Summarist
                      annual membership. You are under no obligation to continue
                      your subscription, and you will only be billed when the
                      trial period expires. With Premium access, you can learn
                      at your own pace and as frequently as you desire, and you
                      may terminate your subscription prior to the conclusion of
                      the 7-day free trial.
                    </div>
                  </div>
                </div>

                <div className="accordion__card">
                  <div
                    className="accordion__header"
                    onClick={() => handleToggle(1)}
                  >
                    <div className="accordion__title">
                      Can I switch subscriptions from monthly to yearly, or
                      yearly to monthly?
                    </div>
                    <FaChevronDown
                      className={`accordion__icon ${openIndex === 1 ? "accordion__icon--rotate" : ""}`}
                      size={24}
                    />
                  </div>
                  <div
                    className={`collapse ${openIndex === 1 ? "show" : ""}`}
                    style={{ height: openIndex === 1 ? "87px" : "0px" }}
                  >
                    <div className="accordion__body">
                      While an annual plan is active, it is not feasible to
                      switch to a monthly plan. However, once the current month
                      ends, transitioning from a monthly plan to an annual plan
                      is an option.
                    </div>
                  </div>
                </div>

                <div className="accordion__card">
                  <div
                    className="accordion__header"
                    onClick={() => handleToggle(2)}
                  >
                    <div className="accordion__title">
                      What&apos;s included in the Premium plan?
                    </div>
                    <FaChevronDown
                      className={`accordion__icon ${openIndex === 2 ? "accordion__icon--rotate" : ""}`}
                      size={24}
                    />
                  </div>
                  <div
                    className={`collapse ${openIndex === 2 ? "show" : ""}`}
                    style={{ height: openIndex === 2 ? "108px" : "0px" }}
                  >
                    <div className="accordion__body">
                      Premium membership provides you with the ultimate
                      Summarist experience, including unrestricted entry to many
                      best-selling books high-quality audio, the ability to
                      download titles for offline reading, and the option to
                      send your reads to your Kindle.
                    </div>
                  </div>
                </div>

                <div className="accordion__card">
                  <div
                    className="accordion__header"
                    onClick={() => handleToggle(3)}
                  >
                    <div className="accordion__title">
                      Can I cancel during my trial or subscription?
                    </div>
                    <FaChevronDown
                      className={`accordion__icon ${openIndex === 3 ? "accordion__icon--rotate" : ""}`}
                      size={24}
                    />
                  </div>
                  <div
                    className={`collapse ${openIndex === 3 ? "show" : ""}`}
                    style={{ height: openIndex === 3 ? "87px" : "0px" }}
                  >
                    <div className="accordion__body">
                      You will not be charged if you cancel your trial before
                      its conclusion. While you will not have complete access to
                      the entire Summarist library, you can still expand your
                      knowledge with one curated book per day.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ChoosePlan;
