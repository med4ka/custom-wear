"use client";

import { useWearStore } from "@/store/useWearStore";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Shirt, Check, ArrowLeft, LayoutGrid, Folders, Package, ShoppingBag, X, Trash2, Loader2, CheckCircle2, MoveRight } from "lucide-react";

export default function Home() {
  const { category, productId, color, size, cart, setCategory, setProductId, setColor, setSize, addToCart, removeFromCart, clearCart } = useWearStore();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const allProducts = useMemo(() => ([
    { id: 'tshirt1', category: 'tops', name: 'Premium Tee', price: 25, asset: '/wearable/baju1.png' },
    { id: 'polo1', category: 'tops', name: 'Oxford Button-Up', price: 40, asset: '/wearable/baju3.png' },
    { id: 'shirt1', category: 'tops', name: 'Classic Polo', price: 55, asset: '/wearable/baju2.png' },
    { id: 'jacket1', category: 'outerwear', name: 'Winter Hoodie', price: 85, asset: '/wearable/jacket1.png' },
    { id: 'jacket2', category: 'outerwear', name: 'Work Jacket', price: 90, asset: '/wearable/jacket2.png' },
    { id: 'jacket3', category: 'outerwear', name: 'Simple Hoodie', price: 110, asset: '/wearable/jacket3.png' },
    { id: 'pants1', category: 'bottoms', name: 'Slim Fit Chinos', price: 60, asset: '/wearable/celana1.png' },
    { id: 'pants2', category: 'bottoms', name: 'Premium Denim', price: 75, asset: '/wearable/celana2.png' },
    { id: 'pants3', category: 'bottoms', name: 'Everyday Sweats', price: 50, asset: '/wearable/celana3.png' },
  ]), []);

  const filteredProducts = useMemo(() => {
    if (category === 'all') return allProducts;
    return allProducts.filter(p => p.category === category);
  }, [category, allProducts]);

  const currentProduct = useMemo(() => {
    return allProducts.find(p => p.id === productId) || allProducts[0];
  }, [productId, allProducts]);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const handleAddToCart = () => {
    addToCart({
      productId: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      color: color,
      size: size,
      asset: currentProduct.asset
    });
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setCheckoutStatus('loading');
    setTimeout(() => {
      setCheckoutStatus('success');
      clearCart();
      setTimeout(() => {
        setCheckoutStatus('idle');
        setIsCartOpen(false);
      }, 3000);
    }, 2000);
  };

  const categoriesUI = [
    { name: 'Show All', id: 'all' as const, icon: LayoutGrid },
    { name: 'Tops', id: 'tops' as const, icon: Shirt },
    { name: 'Outerwear', id: 'outerwear' as const, icon: Package },
    { name: 'Bottoms', id: 'bottoms' as const, icon: Folders },
  ];

  const colors = ['#F3F4F6', '#1E293B', '#991B1B', '#166534', '#0284C7', '#D97706'];
  const sizes: ('S' | 'M' | 'L' | 'XL')[] = ['S', 'M', 'L', 'XL'];

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA] font-sans overflow-hidden">
      
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed top-8 right-8 z-40 bg-white shadow-xl shadow-neutral-200/50 p-4 rounded-full border border-neutral-100 hover:scale-110 transition-transform active:scale-95"
      >
        <ShoppingBag size={24} className="text-neutral-900" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
            {cart.length}
          </span>
        )}
      </button>

      <section className="flex-1 flex items-center justify-center relative border-r border-neutral-200 p-8 h-[50vh] md:h-screen sticky top-0 bg-[#F5F5F7] overflow-hidden">
        
        <div 
          className="absolute inset-0 z-0 opacity-[0.25]"
          style={{
            backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-blue-100/50 rounded-full filter blur-[120px] pointer-events-none z-0" />
        <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-orange-100/40 rounded-full filter blur-[120px] pointer-events-none z-0" />

        <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors font-semibold text-sm uppercase tracking-widest group">
           <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </Link>
        <div className="relative z-10 w-full max-w-[450px] aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl shadow-neutral-300/40 border border-neutral-100 p-8 transition-all duration-300">
          <div className="relative w-full h-full">
            <Image src={currentProduct.asset} alt={currentProduct.name} fill className="object-contain z-10 pointer-events-none" priority />
            <div 
              className="absolute inset-0 z-20 mix-blend-multiply pointer-events-none transition-colors duration-300"
              style={{
                backgroundColor: color,
                WebkitMaskImage: `url(${currentProduct.asset})`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url(${currentProduct.asset})`,
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
          </div>
        </div>
      </section>

      <section className="relative w-full md:w-[420px] lg:w-[500px] p-8 md:p-12 overflow-y-auto bg-white overflow-hidden border-l border-neutral-100">
        <div className="absolute top-[20%] left-[20%] w-[10rem] h-[10rem] bg-blue-50/50 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none z-0" />
        <div className="absolute bottom-[20%] right-[20%] w-[10rem] h-[10rem] bg-orange-50/50 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none z-0" />

        <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 flex items-center gap-3">
              <Package className="text-neutral-900" /> Outfit Studio.
            </h1>
            
            <div className="mb-10">
              <label className="block text-sm font-semibold mb-4 text-neutral-500 uppercase tracking-widest">1. Select Category</label>
              <div className="grid grid-cols-2 gap-3">
                {categoriesUI.map((option) => (
                  <button key={option.id} onClick={() => { setCategory(option.id); const firstProd = allProducts.find(p => option.id === 'all' ? true : p.category === option.id); if(firstProd) setProductId(firstProd.id); }} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 ${category === option.id ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' : 'border-neutral-200 bg-white hover:border-neutral-300'}`}>
                    {option.icon && <option.icon size={20} className={category === option.id ? 'text-white' : 'text-neutral-500'} />}
                    <span className="font-semibold text-xs tracking-wide">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-sm font-semibold mb-4 text-neutral-500 uppercase tracking-widest">2. Select Item</label>
              <div className="grid grid-cols-2 gap-3 max-h-[250px] overflow-y-auto p-1">
                {filteredProducts.map((option) => (
                  <button key={option.id} onClick={() => setProductId(option.id)} className={`flex flex-col items-start gap-2 p-5 rounded-xl border-2 transition-all duration-300 ${productId === option.id ? 'border-neutral-900 bg-neutral-900 text-white shadow-md scale-105' : 'border-neutral-200 bg-white hover:border-neutral-300'}`}>
                    <span className="font-semibold text-xs tracking-wide">{option.name}</span>
                    <span className={`font-bold text-sm ${productId === option.id ? 'text-white' : 'text-neutral-700'}`}>${option.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-sm font-semibold mb-4 text-neutral-500 uppercase tracking-widest">3. Select Color</label>
              <div className="flex flex-wrap gap-4">
                {colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} className={`w-14 h-14 rounded-full border-2 transition-all duration-300 hover:scale-110 flex items-center justify-center ${color === c ? 'border-neutral-900 scale-110 shadow-lg' : 'border-neutral-200 shadow-sm'}`} style={{ backgroundColor: c }}>
                    {color === c && <Check className="w-6 h-6 text-white mix-blend-difference" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <label className="block text-sm font-semibold mb-4 text-neutral-500 uppercase tracking-widest">4. Select Size</label>
              <div className="grid grid-cols-4 gap-0 rounded-2xl overflow-hidden border border-neutral-200 bg-white p-1 shadow-sm">
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`p-4 font-bold text-sm transition-all duration-300 rounded-xl ${size === s ? 'bg-neutral-900 text-white shadow-md' : 'text-neutral-500 hover:bg-neutral-50'}`}>{s}</button>
                ))}
              </div>
            </div>
            
            <button onClick={handleAddToCart} className="w-full bg-neutral-900 text-white p-6 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-xl active:scale-[0.98] flex items-center justify-between group">
              <span className="uppercase tracking-widest flex items-center gap-3">
                Add To Cart <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
              </span>
              <span className="bg-white/20 px-4 py-1 rounded-lg tabular-nums">${currentProduct.price}</span>
            </button>
        </div>
      </section>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          
          <div className="relative w-full max-w-[450px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingBag /> Your Cart
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#FAFAFA]">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-4">
                  <ShoppingBag size={64} opacity={0.2} />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-neutral-100">
                    <div className="w-20 h-20 bg-[#F5F5F7] rounded-xl flex items-center justify-center relative overflow-hidden">
                      <Image src={item.asset} alt={item.name} fill className="object-contain p-2 mix-blend-multiply" />
                      <div className="absolute top-1 left-1 w-3 h-3 rounded-full border border-neutral-200 shadow-sm" style={{ backgroundColor: item.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900">{item.name}</h4>
                      <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">Size: {item.size}</p>
                      <p className="font-bold text-neutral-900 mt-2">${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-neutral-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-neutral-500 font-semibold uppercase tracking-widest">Total</span>
                  <span className="text-3xl font-black">${cartTotal}</span>
                </div>
                
                <button 
                  onClick={handleCheckout} 
                  disabled={checkoutStatus !== 'idle'}
                  className={`w-full p-5 rounded-xl font-bold text-lg flex items-center justify-center transition-all ${
                    checkoutStatus === 'success' ? 'bg-green-500 text-white' : 
                    checkoutStatus === 'loading' ? 'bg-neutral-200 text-neutral-500' : 
                    'bg-neutral-900 text-white hover:bg-black active:scale-[0.98]'
                  }`}
                >
                  {checkoutStatus === 'idle' && 'Proceed to Checkout'}
                  {checkoutStatus === 'loading' && <><Loader2 className="animate-spin mr-2" /> Processing Bank...</>}
                  {checkoutStatus === 'success' && <><CheckCircle2 className="mr-2" /> Payment Successful!</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </main>
  );
}