import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import productShowcase from "@/assets/product-showcase.jpg";
import videoHero from "@/assets/menjahit-baju.mp4";
import videoJahit from "@/assets/jahit-baju.mp4";
import videoCustomBaju from "@/assets/custom-baju.mp4";
import { IconBebasCustom, IconCottonCombed, IconHarga, IconWA, IconIG, IconTiktok, IconShopee } from "@/assets/icons";
import { KaosKomunitas, KaosDaycare, KaosSatuan } from "@/assets/products";

const Home = () => {
  const highlights = [
    {
      icon: <IconCottonCombed className="h-8 w-8 text-accent" />,
      title: "Bahan Cotton Combed Premium",
      description: "Cotton Combed 24s yang lembut, anti bau dan nyaman untuk kulit",
    },
    {
      icon: <IconBebasCustom className="h-8 w-8 text-accent" />,
      title: "Bebas Custom Sesuai Desain",
      description: "Desain sesuka hati, kami siap mewujudkan ide kreatif Anda",
    },
    {
      icon: <IconHarga className="h-8 w-8 text-accent" />,
      title: "Harga Terjangkau & Pelayanan Cepat",
      description: "Kualitas premium dengan harga bersahabat dan proses cepat",
    },
  ];

  const categories = [
    {
      title: "Kaos Komunitas / Gathering",
      description: "Satukan kebersamaan dengan desain unik komunitas Anda",
      image: KaosKomunitas,
    },
    {
      title: "Kaos Kelas / Daycare",
      description: "Seragam nyaman untuk anak-anak dengan bahan berkualitas",
      image: KaosDaycare,
    },
    {
      title: "Kaos Satuan",
      description: "Perfect untuk kebutuhan personal atau kado spesial",
      image: KaosSatuan,
    },
  ];

  const testimonials = [
    {
      name: "Ibu Sarah",
      role: "Daycare Owner",
      comment: "Kaos seragam daycare dari Cottonfit sangat nyaman untuk anak-anak. Bahannya lembut dan menyerap keringat dengan baik!",
      rating: 5,
    },
    {
      name: "Rizky Pratama",
      role: "Ketua Komunitas",
      comment: "Pelayanan cepat dan hasil cetakan sangat memuaskan. Recommended untuk kaos komunitas!",
      rating: 5,
    },
    {
      name: "Dita Anggraini",
      role: "Customer",
      comment: "Harga terjangkau dengan kualitas yang tidak mengecewakan. Pasti order lagi!",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col">

      {/* Hero Section - pakai menjahit-baju.mp4 */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoHero} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/65" />
        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight animate-fade-in">
            Jasa Pembuatan Kaos Custom Berkualitas
          </h1>
          <p className="text-lg md:text-xl text-blue-900 mb-8 max-w-2xl mx-auto animate-fade-in">
            Cottonfit — Solusi kaos custom untuk daycare, komunitas, gathering, dan kebutuhan lainnya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/catalog">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 bg-blue-900 hover:bg-accent/90">
                Lihat Katalog
              </Button>
            </Link>
            <a href="https://wa.me/6282228302403" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 bg-accent hover:bg-accent/90">
                Hubungi Kami
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="card-elegant p-8 text-center hover-lift">
                <div className="flex justify-center mb-4">{highlight.icon}</div>
                <h3 className="text-xl text-blue-900 font-semibold mb-3">{highlight.title}</h3>
                <p className="text-muted-foreground text-gray-900">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-blue-900 font-bold mb-4">Produk Unggulan Kami</h2>
            <p className="text-muted-foreground text-gray-900 text-lg max-w-2xl mx-auto">
              Berbagai pilihan kaos custom berkualitas tinggi untuk semua kebutuhan Anda
            </p>
          </div>
          <div className="mb-12">
            <img
              src={productShowcase}
              alt="Product Showcase"
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="card-elegant overflow-hidden hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Link to="/catalog">
                    <Button variant="outline" className="w-full">
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Kualitas Section dengan 2 Video berbeda */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-blue-900 font-bold mb-4">
              Kualitas Terbaik Dimulai dari Proses
            </h2>
            <p className="text-muted-foreground text-gray-900 text-lg max-w-2xl mx-auto">
              Kami memastikan setiap jahitan dikerjakan dengan penuh ketelitian, standar tinggi, dan tenaga terampil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Video 1 - jahit-baju.mp4 */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <video controls className="w-full">
                <source src={videoJahit} type="video/mp4" />
              </video>
              <div className="p-4 bg-secondary text-center">
                <p className="font-semibold text-blue-900">Proses Menjahit</p>
                <p className="text-sm text-muted-foreground">Ketelitian dalam setiap jahitan</p>
              </div>
            </div>

            {/* Video 2 - custom-baju.mp4 */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <video controls className="w-full">
                <source src={videoCustomBaju} type="video/mp4" />
              </video>
              <div className="p-4 bg-secondary text-center">
                <p className="font-semibold text-blue-900">Proses Custom Baju</p>
                <p className="text-sm text-muted-foreground">Dari desain hingga produk jadi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Pelanggan Kami</h2>
            <p className="text-muted-foreground text-lg">
              Kepuasan pelanggan adalah prioritas utama kami
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-elegant p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Users className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Mewujudkan Desain Kaos Custom Anda?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Hubungi kami melalui media sosial favorit Anda
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://wa.me/6282228302403" target="_blank" aria-label="WhatsApp" className="group">
              <IconWA className="h-12 w-12 text-gray-400 transition-all duration-300 group-hover:scale-125 group-hover:text-green-500 drop-shadow-md group-hover:drop-shadow-lg" />
            </a>
            <a href="https://www.instagram.com/cottonfit_wear" target="_blank" aria-label="Instagram" className="group">
              <IconIG className="h-12 w-12 text-gray-400 transition-all duration-300 group-hover:scale-125 group-hover:text-pink-500 drop-shadow-md group-hover:drop-shadow-lg" />
            </a>
            <a href="https://www.tiktok.com/@cottonfitwear" target="_blank" aria-label="TikTok" className="group">
              <IconTiktok className="h-12 w-12 text-gray-400 transition-all duration-300 group-hover:scale-125 group-hover:text-black drop-shadow-md group-hover:drop-shadow-lg" />
            </a>
            <a href="https://shopee.co.id/firdausfithradi" target="_blank" aria-label="Shopee" className="group">
              <IconShopee className="h-12 w-12 text-gray-400 transition-all duration-300 group-hover:scale-125 group-hover:text-orange-500 drop-shadow-md group-hover:drop-shadow-lg" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;