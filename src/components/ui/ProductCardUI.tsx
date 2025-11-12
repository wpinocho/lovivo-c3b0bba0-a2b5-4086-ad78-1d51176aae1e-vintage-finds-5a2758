import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * Vintage fashion styled product card
 */

interface ProductCardUIProps {
  product: Product
}

// Extract condition from tags
const getConditionBadge = (tags: string[] | null) => {
  if (!tags) return null
  const condition = tags.find(tag => 
    tag.toLowerCase().includes('excellent condition') || 
    tag.toLowerCase().includes('good condition') ||
    tag.toLowerCase().includes('fair condition')
  )
  return condition
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => {
        const condition = getConditionBadge(logic.product.tags)
        
        return (
          <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-card border-border">
            <CardContent className="p-0">
              <Link to={`/products/${logic.product.slug}`} className="block">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                    <img
                      src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                      alt={logic.product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {logic.discountPercentage && (
                      <Badge className="bg-destructive text-destructive-foreground shadow-lg">
                        -{logic.discountPercentage}%
                      </Badge>
                    )}
                    {condition && (
                      <Badge className="bg-vintage-badge text-vintage-badge-foreground shadow-lg font-medium">
                        {condition.replace(' condition', '')}
                      </Badge>
                    )}
                    {logic.product.featured && (
                      <Badge className="bg-primary text-primary-foreground shadow-lg">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {!logic.inStock && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        Sold Out
                      </Badge>
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/products/${logic.product.slug}`}>
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {logic.product.title}
                  </h3>
                  {logic.product.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {logic.product.description.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                </Link>

                {logic.hasVariants && logic.options && (
                  <div className="mb-3 space-y-2">
                    {logic.options.map((opt) => (
                      <div key={opt.id}>
                        <div className="text-xs font-medium text-muted-foreground mb-1">{opt.name}</div>
                        <div className="flex flex-wrap gap-2">
                          {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                            const isSelected = logic.selected[opt.name] === val
                            const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                            if (swatch) {
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => logic.handleOptionChange(opt.name, val)}
                                  title={`${opt.name}: ${val}`}
                                  className={`h-7 w-7 rounded-full border-2 transition-all ${
                                    isSelected ? 'border-primary scale-110' : 'border-border hover:border-primary/50'
                                  }`}
                                  style={{ backgroundColor: swatch }}
                                  aria-label={`${opt.name}: ${val}`}
                                />
                              )
                            }

                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                className={`border rounded-md px-3 py-1 text-xs font-medium transition-all ${
                                  isSelected 
                                    ? 'border-primary bg-primary text-primary-foreground' 
                                    : 'border-border bg-background hover:border-primary/50'
                                }`}
                                aria-pressed={isSelected}
                              >
                                {val}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-foreground">
                      {logic.formatMoney(logic.currentPrice)}
                    </span>
                    {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {logic.formatMoney(logic.currentCompareAt)}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      logic.onAddToCartSuccess()
                      logic.handleAddToCart()
                    }}
                    disabled={!logic.canAddToCart}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    {logic.inStock ? 'Add to Cart' : 'Sold Out'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      }}
    </HeadlessProductCard>
  )
}
