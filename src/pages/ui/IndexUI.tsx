import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { Sparkles, Heart, Recycle, ShieldCheck } from 'lucide-react';

/**
 * EDITABLE UI - IndexUI
 * Vintage Secondhand & Recommerce Fashion Store
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-hero-gradient-from to-hero-gradient-to overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-accent-foreground" />
                <span className="text-sm font-medium text-primary-foreground">Sustainable Fashion</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Buy & Sell
                <br />
                <span className="text-accent">Vintage Fashion</span>
              </h1>
              
              <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                Discover unique vintage pieces and give pre-loved fashion a new life. Quality, style, and sustainability in every find.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg"
                  onClick={handleShowAllProducts}
                >
                  Explore Finds
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
                >
                  How It Works
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20">
                <div>
                  <div className="text-3xl font-bold text-primary-foreground mb-1">2k+</div>
                  <div className="text-sm text-primary-foreground/80">Vintage Items</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-foreground mb-1">500+</div>
                  <div className="text-sm text-primary-foreground/80">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-foreground mb-1">100%</div>
                  <div className="text-sm text-primary-foreground/80">Authenticated</div>
                </div>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <img 
                src="/src/assets/hero-vintage.jpg" 
                alt="Vintage Fashion Collection"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vintage Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Unique Pieces</h3>
              <p className="text-sm text-muted-foreground">One-of-a-kind items you won't find anywhere else</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Recycle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Eco-Friendly</h3>
              <p className="text-sm text-muted-foreground">Reduce fashion waste and support sustainability</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Quality Checked</h3>
              <p className="text-sm text-muted-foreground">Every item inspected and authenticated</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Affordable Luxury</h3>
              <p className="text-sm text-muted-foreground">Designer pieces at fraction of retail price</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Curated Collections
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hand-picked vintage finds organized by style, era, and occasion
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Collection'}` 
                  : 'Featured Vintage Finds'
                }
              </h2>
              <p className="text-muted-foreground">
                {selectedCollectionId 
                  ? 'Explore our curated selection' 
                  : 'Our best picks for this season'
                }
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
              >
                View All
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products available in this collection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Care Guide Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vintage Care Guide
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Keep your vintage treasures looking beautiful for years to come
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-card p-6 rounded-lg">
                  <div className="text-2xl mb-2">🧼</div>
                  <h3 className="font-semibold text-foreground mb-2">Gentle Cleaning</h3>
                  <p className="text-sm text-muted-foreground">
                    Hand wash delicate pieces in cold water with mild detergent. Avoid harsh chemicals.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg">
                  <div className="text-2xl mb-2">👔</div>
                  <h3 className="font-semibold text-foreground mb-2">Proper Storage</h3>
                  <p className="text-sm text-muted-foreground">
                    Store in a cool, dry place. Use padded hangers for coats and jackets.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg">
                  <div className="text-2xl mb-2">✨</div>
                  <h3 className="font-semibold text-foreground mb-2">Regular Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Air out regularly and inspect for any needed repairs to maintain quality.
                  </p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="mt-8"
              >
                Read Full Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Vintage Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of vintage lovers and discover unique fashion finds that tell a story
          </p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            onClick={handleShowAllProducts}
          >
            Explore All Finds
          </Button>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};
