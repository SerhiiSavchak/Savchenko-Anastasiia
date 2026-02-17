import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";
import { Directions } from "@/components/sections/directions";
import { Products } from "@/components/sections/products";
import { VIPSection } from "@/components/sections/vip";
import { Contacts } from "@/components/sections/contacts";
import { Footer } from "@/components/footer";
import { ScrollRevealWrapper } from "@/components/scroll-reveal-wrapper";
import { getProducts, getVIPItems } from "@/lib/strapi";

export default async function Home() {
  const [products, vipItems] = await Promise.all([
    getProducts(),
    getVIPItems(),
  ]);

  const featuredVIP = vipItems[0] ?? null;

  return (
    <>
      <Header />
      <ScrollRevealWrapper>
        <main>
          <Hero featuredVIP={featuredVIP} />
          <About />
          <Expertise />
          <Directions />
          <Products products={products} />
          <VIPSection items={vipItems} />
          <Contacts />
        </main>
        <Footer />
      </ScrollRevealWrapper>
    </>
  );
}
