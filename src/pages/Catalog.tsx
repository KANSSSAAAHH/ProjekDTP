import './catalog.css';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { KaosKomunitas, KaosDaycare, KaosSatuan, JerseyMilano, JerseyEmboss, JerseyAirwalk, JerseyBola, Jaket, Kemeja, TunikCustom, KaosAngkatan, KaosCafe, KaosCombedDaycare, KaosPolo, KaosPoloCombed, KaosRetail, KaosUmkm } from "@/assets/products";

type FilterCategory = "all" | "kaos" | "polo" | "jersey" | "tunik" | "kemeja" | "jaket";

const Catalog = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const products = [
    {
      slug: "kaos-komunitas-gathering",
      title: "Kaos Komunitas / Gathering",
      description: "Sempurna untuk acara komunitas, gathering, atau reuni. Minimum order fleksibel dengan harga spesial untuk jumlah banyak.",
      image: KaosKomunitas,
      category: "kaos" as FilterCategory,
    },
    {
      slug: "kaos-kelas-daycare",
      title: "Kaos Kelas / Daycare",
      description: "Seragam kelas atau daycare dengan bahan yang aman untuk anak-anak. Menyerap keringat dan tidak mudah luntur.",
      image: KaosCombedDaycare,
      category: "kaos" as FilterCategory,
    },
    {
      slug: "kaos-custom-satuan",
      title: "Kaos Custom Satuan",
      description: "Kaos custom berkualitas untuk kebutuhan personal. Tersedia berbagai ukuran dan warna. Bahan Cotton Combed 24s yang lembut dan nyaman.",
      image: KaosSatuan,
      category: "kaos" as FilterCategory,
    },
    {
      slug: "kaos-polo-custom",
      title: "Kaos Polo CVC",
      description: "Polo CVC menggunakan bahan Chief Value Cotton (campuran katun dan polyester) yang nyaman dipakai namun lebih tahan bentuk.",
      image: KaosPolo,
      category: "polo" as FilterCategory,
    },
    {
      slug: "kaos-polo-combed",
      title: "Kaos Polo Combed",
      description: "Polo Combed dibuat dari bahan katun combed yang lembut, halus, dan nyaman di kulit.",
      image: KaosPoloCombed,
      category: "polo" as FilterCategory,
    },
    {
      slug: "jersey-club",
      title: "Jersey Club",
      description: "Jersey olahraga custom untuk klub atau tim Anda. Bahan dry-fit yang nyaman dan menyerap keringat.",
      image: JerseyBola,
      category: "jersey" as FilterCategory,
    },
    {
      slug: "jersey-emboss",
      title: "Jersey Emboss",
      description: "Memiliki tekstur motif timbul yang unik sehingga tampilan lebih premium dan sporty.",
      image: JerseyEmboss,
      category: "jersey" as FilterCategory,
    },
    {
      slug: "tunik-custom",
      title: "Tunik Custom",
      description: "Tunik custom dengan berbagai model dan desain. Cocok untuk seragam kerja atau acara formal.",
      image: TunikCustom,
      category: "tunik" as FilterCategory,
    },
    {
      slug: "jersey-airwalk",
      title: "Jersey Airwalk",
      description: "Tekstur lebih berpori sehingga cepat menyerap dan menguapkan keringat.",
      image: JerseyAirwalk,
      category: "jersey" as FilterCategory,
    },
    {
      slug: "patch-logo-bordir",
      title: "Patch / Logo Bordir",
      description: "Logo atau patch custom dengan teknik bordir berkualitas tinggi. Awet dan tidak mudah rusak.",
      image: KaosPolo,
      category: ["polo", "kemeja"] as FilterCategory[],
    },
    {
      slug: "logo-print-custom",
      title: "Logo Print Custom",
      description: "Printing logo dengan berbagai teknik: DTF, Sablon, atau Digital Print. Hasil tajam dan tahan lama.",
      image: KaosUmkm,
      category: "kaos" as FilterCategory,
    },
    {
      slug: "jersey-milano",
      title: "Jersey Milano",
      description: "Bahan halus, ringan, dan nyaman di kulit dengan sirkulasi udara baik.",
      image: JerseyMilano,
      category: "jersey" as FilterCategory,
    },
    {
      slug: "kemeja-custom",
      title: "Kemeja",
      description: "Kemeja Nagata Drill memadukan tampilan rapi dengan kekuatan bahan drill yang tebal dan tahan lama.",
      image: Kemeja,
      category: "kemeja" as FilterCategory,
    },
    {
      slug: "jaket-fleece",
      title: "Jaket Fleece",
      description: "Jaket Fleece Premium yang hangat, lembut, dan nyaman dipakai seharian.",
      image: Jaket,
      category: "jaket" as FilterCategory,
    },  
  ];

  const filters: { key: FilterCategory; label: string }[] = [
    { key: "all", label: "Semua Produk" },
    { key: "kaos", label: "Kaos" },
    { key: "polo", label: "Polo" },
    { key: "jersey", label: "Jersey" },
    { key: "tunik", label: "Tunik" },
    { key: "kemeja", label: "Kemeja" },
    { key: "jaket", label: "Jaket" },
  ];

  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-16 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary animate-fade-in">Katalog Produk</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Jelajahi berbagai pilihan produk kaos custom berkualitas tinggi untuk semua kebutuhan Anda
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-secondary border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? "default" : "outline"}
                className={activeFilter === filter.key ? "btn-primary-gradient" : ""}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card key={index} className="card-elegant overflow-hidden hover-lift group">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{product.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href={`https://wa.me/6282228302403?text=Halo, saya tertarik dengan produk ${product.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full btn-primary-gradient">
                        Pesan Sekarang
                      </Button>
                    </a>
                    <Link to={`/catalog/${product.slug}`}>
                      <Button variant="outline">
                        Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tidak Menemukan Yang Anda Cari?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Kami siap membantu mewujudkan desain custom sesuai kebutuhan Anda. Hubungi kami untuk konsultasi gratis!
          </p>
          
          <div className="flex flex-col items-center gap-4">
            {/* Tombol WhatsApp */}
            <a href="https://wa.me/6282228302403" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-primary-gradient text-lg px-8">
                Konsultasi via WhatsApp
              </Button>
            </a>

            {/* Tombol Smart Chat yang diperbaiki */}
            <Link to="https://web-production-aed51.up.railway.app" target="_blank"> 
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white text-lg px-20 btn-smart-chat">
                Smart Chat
              </Button>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Catalog;
