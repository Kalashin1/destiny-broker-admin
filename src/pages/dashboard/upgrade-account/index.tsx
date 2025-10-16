import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import Pricing from './components/pricing';
import { Plan } from '../../../types';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebase-setting';

const UpgrageAccount = () => {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    const get_plans = async () => {
      const q = query(collection(db, 'plans'));
      const docRefs = await getDocs(q)
      const _plans = docRefs.docs.map((doc) => ({
        ...doc.data() as Plan,
        id: doc.id
      })) as Plan[]
      setPlans(_plans)
    }

    get_plans()
  }, [])
  return (
    <Layout>
      <section className="lg:flex lg:flex-row justify-between px-6">
        {plans && plans.map((plan) => (<Pricing name={plan.title} amount={plan.price} />))}
      </section>
    </Layout>
  )
}

export default UpgrageAccount