'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  User, 
  Plus, 
  Trash2, 
  LogOut, 
  Package, 
  FolderPlus, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertTriangle,
  FolderOpen,
  Eye,
  EyeOff,
  Loader2,
  MessageSquare,
  Star,
  CheckCircle2,
  Pencil,
  X
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useI18n } from '@/lib/i18n';
import Image from 'next/image';
import { Category, MenuItem, Feedback } from '@/lib/db';

const AVAILABLE_ICONS = [
  'Zap', 'Coffee', 'Gamepad2', 'ShoppingBag', 'Flame', 'GlassWater', 'CupSoda', 'Sparkles', 'Pizza', 'Cookie'
];

export default function AdminPage() {
  const { lang, isAr } = useI18n();

  // Authentication State
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Menu Management State
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'feedback'>('products');

  // Feedback State
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  
  // New Category Form State
  const [catNameEn, setCatNameEn] = useState<string>('');
  const [catNameAr, setCatNameAr] = useState<string>('');
  const [catIcon, setCatIcon] = useState<string>('Zap');
  const [catError, setCatError] = useState<string>('');
  const [catSuccess, setCatSuccess] = useState<string>('');
  const [catLoading, setCatLoading] = useState<boolean>(false);

  // New/Edit Product Form State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodCategoryId, setProdCategoryId] = useState<string>('');
  const [prodNameEn, setProdNameEn] = useState<string>('');
  const [prodNameAr, setProdNameAr] = useState<string>('');
  const [prodDescEn, setProdDescEn] = useState<string>('');
  const [prodDescAr, setProdDescAr] = useState<string>('');
  const [prodPrice, setProdPrice] = useState<string>('');
  const [prodTagEn, setProdTagEn] = useState<string>('');
  const [prodTagAr, setProdTagAr] = useState<string>('');
  const [prodBadge, setProdBadge] = useState<string>('');
  const [prodImageFile, setProdImageFile] = useState<File | null>(null);
  const [prodImagePreview, setProdImagePreview] = useState<string | null>(null);
  const [prodError, setProdError] = useState<string>('');
  const [prodSuccess, setProdSuccess] = useState<string>('');
  const [prodLoading, setProdLoading] = useState<boolean>(false);

  // Check authentication status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/check');
        if (res.ok) {
          setAuthenticated(true);
          loadMenuData();
          loadFeedback();
        }
      } catch (err) {
        console.error('Failed checking authentication', err);
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMenuData() {
    try {
      const res = await fetch(`/api/menu?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
        setItems(data.items || []);
        if (data.categories?.length > 0 && !prodCategoryId) {
          setProdCategoryId(data.categories[0].id);
        }
      }
    } catch (err) {
      console.error('Failed loading menu data', err);
    }
  }

  async function loadFeedback() {
    setFeedbackLoading(true);
    try {
      const res = await fetch(`/api/admin/feedback?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setFeedbackList(data.feedback || []);
      }
    } catch (err) {
      console.error('Failed loading feedback', err);
    } finally {
      setFeedbackLoading(false);
    }
  }

  const handleUpdateFeedback = async (id: string, status: 'approved' | 'hidden' | 'pending') => {
    try {
      await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      loadFeedback();
    } catch (err) {
      console.error('Failed updating feedback', err);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذا التقييم نهائياً؟' : 'Permanently delete this feedback?')) return;
    try {
      await fetch(`/api/admin/feedback?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      loadFeedback();
    } catch (err) {
      console.error('Failed deleting feedback', err);
    }
  };

  // Handle Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || (isAr ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials'));
      } else {
        setAuthenticated(true);
        loadMenuData();
        loadFeedback();
      }
    } catch (err) {
      setLoginError(isAr ? 'حدث خطأ في الاتصال بالخادم' : 'Server connection error');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        setAuthenticated(false);
        setUsernameInput('');
        setPasswordInput('');
      }
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  // Handle Category Add
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCatError('');
    setCatSuccess('');
    setCatLoading(true);

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameEn: catNameEn,
          nameAr: catNameAr,
          icon: catIcon,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCatError(data.error || 'Failed to add category');
      } else {
        setCatSuccess(isAr ? 'تم إضافة القسم بنجاح!' : 'Category added successfully!');
        setCatNameEn('');
        setCatNameAr('');
        setCatIcon('Zap');
        loadMenuData();
      }
    } catch (err) {
      setCatError('Network error');
    } finally {
      setCatLoading(false);
    }
  };

  // Handle Delete Category
  const handleDeleteCategory = async (id: string) => {
    // Check if category has items on client side first
    const categoryItems = items.filter(item => item.categoryId === id);
    if (categoryItems.length > 0) {
      alert(
        isAr 
          ? `لا يمكن حذف هذا القسم لأنه يحتوي على ${categoryItems.length} منتج(منتجات). يرجى حذف أو نقل المنتجات من هذا القسم أولاً.` 
          : `Cannot delete category: It contains ${categoryItems.length} product(s). Please delete or move all products inside this category first.`
      );
      return;
    }

    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذا القسم الخالي؟' : 'Are you sure you want to delete this empty category?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/categories?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        alert(
          data.error || 
          (isAr ? 'فشل حذف القسم. تأكد من إفراغ القسم من جميع المنتجات أولاً.' : 'Category deletion failed. Make sure all products are removed first.')
        );
      }
    } catch (err) {
      alert(isAr ? 'خطأ في الاتصال بالحاسوب' : 'Network error');
    } finally {
      loadMenuData();
    }
  };

  // Handle Image Selector
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProdImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProdImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start editing product
  const handleStartEditProduct = (item: MenuItem) => {
    setEditingProductId(item.id);
    setProdCategoryId(item.categoryId);
    setProdNameEn(item.name || '');
    setProdNameAr(item.nameAr || '');
    setProdDescEn(item.description || '');
    setProdDescAr(item.descriptionAr || '');
    setProdPrice(item.price || '');
    setProdTagEn(item.tag || '');
    setProdTagAr(item.tagAr || '');
    setProdBadge(item.badge || '');
    setProdImageFile(null);
    setProdImagePreview(item.image || null);
    setProdError('');
    setProdSuccess('');
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setProdNameEn('');
    setProdNameAr('');
    setProdDescEn('');
    setProdDescAr('');
    setProdPrice('');
    setProdTagEn('');
    setProdTagAr('');
    setProdBadge('');
    setProdImageFile(null);
    setProdImagePreview(null);
    setProdError('');
    setProdSuccess('');
  };

  // Handle Product Save (Add or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setProdError('');
    setProdSuccess('');
    setProdLoading(true);

    const isEdit = !!editingProductId;

    if (!isEdit && !prodImageFile) {
      setProdError(isAr ? 'الرجاء اختيار صورة المنتج' : 'Please select a product image file');
      setProdLoading(false);
      return;
    }

    const formData = new FormData();
    if (isEdit) {
      formData.append('id', editingProductId);
    }
    formData.append('categoryId', prodCategoryId);
    formData.append('name', prodNameEn);
    formData.append('nameAr', prodNameAr);
    formData.append('description', prodDescEn);
    formData.append('descriptionAr', prodDescAr);
    formData.append('price', prodPrice);
    
    if (prodImageFile) {
      formData.append('image', prodImageFile);
    } else if (isEdit && prodImagePreview) {
      formData.append('image', prodImagePreview);
    }

    if (prodTagEn) formData.append('tag', prodTagEn);
    if (prodTagAr) formData.append('tagAr', prodTagAr);
    if (prodBadge) formData.append('badge', prodBadge);

    try {
      const res = await fetch('/api/admin/products', {
        method: isEdit ? 'PUT' : 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setProdError(data.error || (isEdit ? 'Failed to update product' : 'Failed to add product'));
      } else {
        setProdSuccess(
          isEdit 
            ? (isAr ? 'تم تعديل المنتج بنجاح!' : 'Product updated successfully!') 
            : (isAr ? 'تم إضافة المنتج بنجاح!' : 'Product added successfully!')
        );
        handleCancelEdit();
        loadMenuData();
      }
    } catch (err) {
      setProdError('Network error');
    } finally {
      setProdLoading(false);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm(isAr ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Delete failed');
      } else {
        loadMenuData();
      }
    } catch (err) {
      alert('Network error');
    }
  };

  // Safe Lucide icon rendering
  const renderIcon = (iconName: string) => {
    const IconComp = (LucideIcons as any)[iconName];
    return IconComp ? <IconComp className="w-4 h-4" /> : <Plus className="w-4 h-4" />;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center text-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[#A66DDB] animate-spin" />
          <p className="text-xs uppercase tracking-widest text-[#64748B] font-light">Loading Vega Secure Terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#070708] relative text-[#F8FAFC] overflow-hidden pt-28 pb-20">
        {/* Background glows */}
        <div className="absolute top-[20vh] left-[-15vw] w-[500px] h-[500px] rounded-full bg-[#72B4FF]/4 blur-[130px] -z-10" />
        <div className="absolute bottom-[10vh] right-[-15vw] w-[500px] h-[500px] rounded-full bg-[#E91E8C]/4 blur-[130px] -z-10" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          
          <AnimatePresence mode="wait">
            {!authenticated ? (
              // ── SECURE LOGIN FORM ──
              <motion.div
                key="login-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md mx-auto my-12"
              >
                <div 
                  className="rounded-3xl p-8 border border-[#1E2230]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(14,14,20,0.85) 0%, rgba(8,8,12,0.95) 100%)',
                    backdropFilter: 'blur(16px)'
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#72B4FF] via-[#A66DDB] to-[#E91E8C]" />
                  
                  {/* Lock Shield Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#72B4FF]/10 to-[#E91E8C]/10 border border-[#A66DDB]/20 flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-6 h-6 text-[#A66DDB]" />
                  </div>

                  <h1 className="text-center font-sans font-black text-2xl tracking-tight text-[#F8FAFC]">
                    {isAr ? 'محطة التحكم الآمنة' : 'SECURE CONTROL PANEL'}
                  </h1>
                  <p className="text-center text-xs text-[#64748B] mt-2 mb-8 font-light uppercase tracking-widest">
                    {isAr ? 'تسجيل الدخول للمسؤولين فقط' : 'ADMINISTRATOR AUTHENTICATION'}
                  </p>

                  <form onSubmit={handleLogin} className="space-y-5">
                    {/* Username Input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold block">
                        {isAr ? 'اسم المستخدم' : 'Username'}
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          type="text"
                          required
                          value={usernameInput}
                          onChange={(e) => setUsernameInput(e.target.value)}
                          placeholder="e.g. Nemo"
                          className="w-full pl-11 pr-4 py-3 bg-[#070708]/60 border border-[#1E2230] rounded-xl text-sm focus:outline-none focus:border-[#72B4FF] transition-all text-[#F8FAFC]"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold block">
                        {isAr ? 'كلمة المرور' : 'Password'}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          type="password"
                          required
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3 bg-[#070708]/60 border border-[#1E2230] rounded-xl text-sm focus:outline-none focus:border-[#E91E8C] transition-all text-[#F8FAFC]"
                        />
                      </div>
                    </div>

                    {/* Error Banner */}
                    {loginError && (
                      <div className="p-3.5 bg-red-950/30 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2.5">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full py-3.5 rounded-xl font-semibold text-xs uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      style={{
                        background: 'linear-gradient(135deg, #72B4FF, #A66DDB, #E91E8C)',
                      }}
                    >
                      {loginLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Shield className="w-4 h-4" />
                          {isAr ? 'التحقق والدخول' : 'Authorize & Connect'}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              // ── ADMIN CONTROL PANEL DASHBOARD ──
              <motion.div
                key="admin-dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Header Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1E2230] pb-6">
                  <div>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#A66DDB] font-medium">
                      {isAr ? 'لوحة المسؤولين' : 'Vega Control Hub'}
                    </span>
                    <h1 className="font-sans font-black text-3xl sm:text-4xl text-[#F8FAFC] mt-1">
                      {isAr ? 'إدارة محتوى القائمة' : 'Menu Admin Dashboard'}
                    </h1>
                  </div>

                  {/* Auth Actions */}
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-semibold text-[#F8FAFC]">Nemo</p>
                      <p className="text-[10px] text-green-400 font-light flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        {isAr ? 'محمي ومتصل' : 'Connected securely'}
                      </p>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2.5 rounded-full border border-[#1E2230] text-xs font-semibold text-[#64748B] hover:text-[#F8FAFC] hover:border-red-500/30 hover:bg-red-950/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {isAr ? 'خروج' : 'Disconnect'}
                    </button>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-[#1E2230]/40 pb-px">
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`pb-4 px-6 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === 'products'
                        ? 'border-[#A66DDB] text-[#F8FAFC]'
                        : 'border-transparent text-[#64748B] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    {isAr ? 'المنتجات والوجبات' : 'Products & Items'}
                  </button>

                  <button
                    onClick={() => setActiveTab('categories')}
                    className={`pb-4 px-6 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === 'categories'
                        ? 'border-[#A66DDB] text-[#F8FAFC]'
                        : 'border-transparent text-[#64748B] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <FolderOpen className="w-4 h-4" />
                    {isAr ? 'الأقسام والتصنيفات' : 'Menu Categories'}
                  </button>

                  <button
                    onClick={() => { setActiveTab('feedback'); loadFeedback(); }}
                    className={`pb-4 px-6 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === 'feedback'
                        ? 'border-[#72B4FF] text-[#F8FAFC]'
                        : 'border-transparent text-[#64748B] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    {isAr ? 'التقييمات' : 'Feedback'}
                    {feedbackList.filter(f => f.status === 'pending').length > 0 && (
                      <span className="text-[9px] bg-[#E91E8C] text-white px-1.5 py-0.5 rounded-full font-black">
                        {feedbackList.filter(f => f.status === 'pending').length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Dynamic Content Tab Screens */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {activeTab === 'products' ? (
                    // ─────────────── TAB: PRODUCTS ───────────────
                    <>
                      {/* Form: Add Product */}
                      <div 
                        className="lg:col-span-5 rounded-2xl p-6 border border-[#1E2230] relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, rgba(14,14,20,0.85) 0%, rgba(8,8,12,0.95) 100%)' }}
                      >
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2.5">
                            {editingProductId ? <Pencil className="w-5 h-5 text-[#A66DDB]" /> : <Plus className="w-5 h-5 text-[#72B4FF]" />}
                            <h2 className="text-base font-bold text-[#F8FAFC]">
                              {editingProductId 
                                ? (isAr ? 'تعديل المنتج الحالي' : 'Edit Product') 
                                : (isAr ? 'إضافة منتج جديد' : 'Add New Product')}
                            </h2>
                          </div>
                          {editingProductId && (
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="px-2.5 py-1 rounded-lg bg-[#1E2230]/60 hover:bg-red-500/20 text-xs text-[#64748B] hover:text-red-400 border border-[#1E2230] flex items-center gap-1 transition-all"
                            >
                              <X className="w-3.5 h-3.5" />
                              {isAr ? 'إلغاء' : 'Cancel'}
                            </button>
                          )}
                        </div>

                        {categories.length === 0 ? (
                          <div className="p-4 bg-yellow-950/20 border border-yellow-500/20 rounded-xl text-xs text-yellow-400 flex items-center gap-2.5">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                            <span>{isAr ? 'الرجاء إضافة تصنيف/قسم أولاً قبل إضافة المنتجات.' : 'Please add a category first before creating products.'}</span>
                          </div>
                        ) : (
                          <form onSubmit={handleSaveProduct} className="space-y-4">
                            {/* Category Dropdown */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'القسم / التصنيف' : 'Category'}</label>
                              <select
                                value={prodCategoryId}
                                onChange={(e) => setProdCategoryId(e.target.value)}
                                className="w-full px-4 py-2.5 bg-[#070708]/80 border border-[#1E2230] rounded-xl text-sm focus:outline-none focus:border-[#A66DDB] text-[#F8FAFC]"
                              >
                                {categories.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {isAr ? c.nameAr : c.nameEn}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Names */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'الاسم (إنجليزي)' : 'Name (EN)'}</label>
                                <input
                                  type="text"
                                  required
                                  value={prodNameEn}
                                  onChange={(e) => setProdNameEn(e.target.value)}
                                  placeholder="Espresso Single"
                                  className="w-full px-3 py-2 bg-[#070708]/80 border border-[#1E2230] rounded-xl text-xs focus:outline-none focus:border-[#72B4FF] text-[#F8FAFC]"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'الاسم (عربي)' : 'Name (AR)'}</label>
                                <input
                                  type="text"
                                  required
                                  value={prodNameAr}
                                  onChange={(e) => setProdNameAr(e.target.value)}
                                  placeholder="اسبريسو سنقل"
                                  className="w-full px-3 py-2 bg-[#070708]/80 border border-[#1E2230] rounded-xl text-xs focus:outline-none focus:border-[#72B4FF] text-[#F8FAFC]"
                                />
                              </div>
                            </div>

                            {/* Descriptions */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'الوصف (إنجليزي)' : 'Desc (EN)'}</label>
                                <textarea
                                  rows={2}
                                  value={prodDescEn}
                                  onChange={(e) => setProdDescEn(e.target.value)}
                                  placeholder="Rich espresso shot..."
                                  className="w-full px-3 py-2 bg-[#070708]/80 border border-[#1E2230] rounded-xl text-xs focus:outline-none focus:border-[#72B4FF] text-[#F8FAFC] resize-none"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'الوصف (عربي)' : 'Desc (AR)'}</label>
                                <textarea
                                  rows={2}
                                  value={prodDescAr}
                                  onChange={(e) => setProdDescAr(e.target.value)}
                                  placeholder="شوت اسبريسو غني..."
                                  className="w-full px-3 py-2 bg-[#070708]/80 border border-[#1E2230] rounded-xl text-xs focus:outline-none focus:border-[#72B4FF] text-[#F8FAFC] resize-none"
                                />
                              </div>
                            </div>

                            {/* Price & Options */}
                            <div className="grid grid-cols-3 gap-3">
                              <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'السعر' : 'Price'}</label>
                                <input
                                  type="text"
                                  required
                                  value={prodPrice}
                                  onChange={(e) => setProdPrice(e.target.value)}
                                  placeholder="3,000 د.ع"
                                  className="w-full px-3 py-2 bg-[#070708]/80 border border-[#1E2230] rounded-lg text-[10px] focus:outline-none focus:border-[#72B4FF]"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'تاغ / وسم' : 'Tag'}</label>
                                <input
                                  type="text"
                                  value={prodTagAr}
                                  onChange={(e) => setProdTagAr(e.target.value)}
                                  placeholder="الأكثر طلباً"
                                  className="w-full px-3 py-2 bg-[#070708]/80 border border-[#1E2230] rounded-lg text-[10px] focus:outline-none focus:border-[#72B4FF]"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'شارة مميزة' : 'Badge'}</label>
                                <input
                                  type="text"
                                  value={prodBadge}
                                  onChange={(e) => setProdBadge(e.target.value)}
                                  placeholder="Legendary"
                                  className="w-full px-3 py-2 bg-[#070708]/80 border border-[#1E2230] rounded-lg text-[10px] focus:outline-none focus:border-[#72B4FF]"
                                />
                              </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold block">{isAr ? 'صورة المنتج' : 'Product Image'}</label>
                              <div className="border-2 border-dashed border-[#1E2230] hover:border-[#A66DDB]/40 rounded-xl p-4 transition-all bg-[#070708]/40 relative">
                                <input
                                  type="file"
                                  required={!editingProductId}
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                />
                                {prodImagePreview ? (
                                  <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#1E2230]">
                                      <Image
                                        src={prodImagePreview}
                                        alt="Upload preview"
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs text-[#F8FAFC] truncate font-medium">
                                        {prodImageFile?.name || (isAr ? 'الصورة الحالية' : 'Current Image')}
                                      </p>
                                      {prodImageFile && (
                                        <p className="text-[10px] text-[#64748B] mt-0.5">{(prodImageFile.size / 1024).toFixed(1)} KB</p>
                                      )}
                                      {editingProductId && !prodImageFile && (
                                        <p className="text-[10px] text-[#72B4FF] mt-0.5">{isAr ? 'انقر لتغيير الصورة (اختياري)' : 'Click to change image (optional)'}</p>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-center py-2 space-y-1">
                                    <ImageIcon className="w-6 h-6 mx-auto text-[#64748B]" />
                                    <p className="text-xs text-[#F8FAFC]">{isAr ? 'انقر أو اسحب لرفع الصورة' : 'Click or drag to upload image'}</p>
                                    <p className="text-[9px] text-[#64748B]">{isAr ? 'JPEG, PNG, WEBP حتى 20 ميجابايت' : 'JPEG, PNG, WEBP up to 20MB'}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Messages */}
                            {prodError && (
                              <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                                <span>{prodError}</span>
                              </div>
                            )}

                            {prodSuccess && (
                              <div className="p-3 bg-green-950/20 border border-green-500/20 text-green-400 rounded-xl text-xs flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{prodSuccess}</span>
                              </div>
                            )}

                            {/* Submit */}
                            <button
                              type="submit"
                              disabled={prodLoading}
                              className="w-full py-3 bg-[#A66DDB]/25 border border-[#A66DDB]/50 text-white rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#A66DDB]/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                            >
                              {prodLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  {editingProductId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                  {editingProductId 
                                    ? (isAr ? 'تحديث وتطبيق التعديلات' : 'Save Changes') 
                                    : (isAr ? 'حفظ وإضافة المنتج' : 'Add Product')}
                                </>
                              )}
                            </button>
                          </form>
                        )}
                      </div>

                      {/* List: Existing Products */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center justify-between border-b border-[#1E2230]/40 pb-3">
                          <h2 className="text-sm font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            {isAr ? 'المنتجات الحالية' : 'Current Menu Products'}
                          </h2>
                          <span className="text-[10px] font-semibold bg-[#12141C] text-[#A66DDB] px-3 py-1 rounded-full border border-[#1E2230]">
                            {items.length} {isAr ? 'منتج' : 'Products'}
                          </span>
                        </div>

                        {items.length === 0 ? (
                          <div className="text-center py-20 bg-[#0E0E12]/40 rounded-2xl border border-[#1E2230] text-[#64748B] font-light">
                            {isAr ? 'لا يوجد منتجات في القائمة حالياً.' : 'No products found on the menu.'}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {items.map((item) => {
                              const itemCat = categories.find(c => c.id === item.categoryId);
                              const isEditingThis = editingProductId === item.id;
                              return (
                                <div 
                                  key={item.id}
                                  className={`rounded-xl bg-[#0E0E12] border p-4 flex gap-4 relative group transition-all ${
                                    isEditingThis ? 'border-[#A66DDB] ring-1 ring-[#A66DDB]/50' : 'border-[#1E2230]'
                                  }`}
                                >
                                  {/* Thumbnail */}
                                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#1E2230] bg-[#121217]">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>

                                  {/* Info */}
                                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                                    <div>
                                      <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-bold text-xs sm:text-sm text-[#F8FAFC] truncate">
                                          {isAr ? item.nameAr : item.name}
                                        </h3>
                                        <span className="text-xs font-black text-[#72B4FF] shrink-0">{item.price}</span>
                                      </div>
                                      
                                      <p className="text-[10px] text-[#64748B] truncate mt-0.5">
                                        {isAr ? item.descriptionAr : item.description}
                                      </p>
                                    </div>

                                    {/* Category badge */}
                                    <div className="flex items-center gap-1.5 mt-2">
                                      <span className="text-[8px] uppercase tracking-wider text-[#A66DDB] bg-[#A66DDB]/10 px-2 py-0.5 rounded border border-[#A66DDB]/15">
                                        {itemCat ? (isAr ? itemCat.nameAr : itemCat.nameEn) : 'Unknown'}
                                      </span>
                                      
                              {item.badge && (
                                        <span className="text-[8px] uppercase tracking-wider text-[#E91E8C] bg-[#E91E8C]/10 px-2 py-0.5 rounded border border-[#E91E8C]/15">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Action Buttons: Edit & Delete */}
                                  <div className="absolute top-2 right-2 md:opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-all">
                                    <button
                                      onClick={() => handleStartEditProduct(item)}
                                      className="p-1.5 rounded-lg bg-[#A66DDB]/20 text-[#A66DDB] hover:bg-[#A66DDB] hover:text-white border border-[#A66DDB]/30 transition-all cursor-pointer"
                                      title={isAr ? 'تعديل المنتج' : 'Edit Product'}
                                    >
                                      <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProduct(item.id)}
                                      className="p-1.5 rounded-lg bg-red-950/20 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/10 transition-all cursor-pointer"
                                      title={isAr ? 'حذف المنتج' : 'Delete Product'}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </>
                  ) : activeTab === 'categories' ? (
                    // ─────────────── TAB: CATEGORIES ───────────────
                    <>
                      {/* Form: Add Category */}
                      <div 
                        className="lg:col-span-5 rounded-2xl p-6 border border-[#1E2230] relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, rgba(14,14,20,0.85) 0%, rgba(8,8,12,0.95) 100%)' }}
                      >
                        <div className="flex items-center gap-2.5 mb-5">
                          <FolderPlus className="w-5 h-5 text-[#E91E8C]" />
                          <h2 className="text-base font-bold text-[#F8FAFC]">{isAr ? 'إضافة تصنيف جديد' : 'Create New Category'}</h2>
                        </div>

                        <form onSubmit={handleAddCategory} className="space-y-4">
                          {/* Name EN */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'اسم التصنيف بالإنكليزية' : 'Category Name (EN)'}</label>
                            <input
                              type="text"
                              required
                              value={catNameEn}
                              onChange={(e) => setCatNameEn(e.target.value)}
                              placeholder="e.g. Energy Drinks"
                              className="w-full px-4 py-2.5 bg-[#070708]/80 border border-[#1E2230] rounded-xl text-xs focus:outline-none focus:border-[#E91E8C] text-[#F8FAFC]"
                            />
                          </div>

                          {/* Name AR */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'اسم التصنيف بالعربية' : 'Category Name (AR)'}</label>
                            <input
                              type="text"
                              required
                              value={catNameAr}
                              onChange={(e) => setCatNameAr(e.target.value)}
                              placeholder="مثال: مشروبات طاقة"
                              className="w-full px-4 py-2.5 bg-[#070708]/80 border border-[#1E2230] rounded-xl text-xs focus:outline-none focus:border-[#E91E8C] text-[#F8FAFC] font-arabic"
                            />
                          </div>

                          {/* Icon Selector */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold">{isAr ? 'الأيقونة' : 'Select Icon'}</label>
                            <div className="grid grid-cols-5 gap-2">
                              {AVAILABLE_ICONS.map((icoName) => (
                                <button
                                  key={icoName}
                                  type="button"
                                  onClick={() => setCatIcon(icoName)}
                                  className={`p-3 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                                    catIcon === icoName
                                      ? 'border-[#E91E8C] bg-[#E91E8C]/10 text-white'
                                      : 'border-[#1E2230] bg-[#070708]/40 text-[#64748B] hover:text-[#F8FAFC]'
                                  }`}
                                  title={icoName}
                                >
                                  {renderIcon(icoName)}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Messages */}
                          {catError && (
                            <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                              <span>{catError}</span>
                            </div>
                          )}

                          {catSuccess && (
                            <div className="p-3 bg-green-950/20 border border-green-500/20 text-green-400 rounded-xl text-xs flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{catSuccess}</span>
                            </div>
                          )}

                          {/* Submit */}
                          <button
                            type="submit"
                            disabled={catLoading}
                            className="w-full py-3 bg-[#E91E8C]/25 border border-[#E91E8C]/50 text-white rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#E91E8C]/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                          >
                            {catLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                {isAr ? 'حفظ وإضافة القسم' : 'Create Category'}
                              </>
                            )}
                          </button>
                        </form>
                      </div>

                      {/* List: Existing Categories */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center justify-between border-b border-[#1E2230]/40 pb-3">
                          <h2 className="text-sm font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-2">
                            <FolderOpen className="w-4 h-4" />
                            {isAr ? 'الأقسام الحالية' : 'Current Menu Categories'}
                          </h2>
                          <span className="text-[10px] font-semibold bg-[#12141C] text-[#E91E8C] px-3 py-1 rounded-full border border-[#1E2230]">
                            {categories.length} {isAr ? 'قسم' : 'Categories'}
                          </span>
                        </div>

                        {categories.length === 0 ? (
                          <div className="text-center py-20 bg-[#0E0E12]/40 rounded-2xl border border-[#1E2230] text-[#64748B] font-light">
                            {isAr ? 'لا يوجد أقسام حالياً.' : 'No categories found.'}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {categories.map((c) => {
                              const count = items.filter(item => item.categoryId === c.id).length;
                              return (
                                <div 
                                  key={c.id}
                                  className="rounded-xl bg-[#0E0E12] border border-[#1E2230] p-4 flex items-center justify-between group transition-all"
                                >
                                  <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-[#070708] border border-[#1E2230] flex items-center justify-center text-[#E91E8C]">
                                      {renderIcon(c.icon)}
                                    </div>
                                    <div>
                                      <h3 className="font-bold text-sm text-[#F8FAFC]">
                                        {isAr ? c.nameAr : c.nameEn}
                                      </h3>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-[10px] text-[#64748B] font-mono uppercase tracking-widest">
                                          ID: {c.id} • {count} {isAr ? 'منتج' : 'items'}
                                        </p>
                                        {count > 0 && (
                                          <span className="text-[9px] text-amber-400 bg-amber-950/30 border border-amber-500/20 px-2 py-0.5 rounded">
                                            {isAr ? 'يتطلب الإفراغ قبل الحذف' : 'Must empty to delete'}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => handleDeleteCategory(c.id)}
                                    className={`p-2 rounded-lg transition-all cursor-pointer ${
                                      count > 0 
                                        ? 'bg-amber-950/20 text-amber-500/80 hover:bg-amber-500/20 hover:text-amber-300 border border-amber-500/20' 
                                        : 'bg-red-950/20 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/10'
                                    }`}
                                    title={
                                      count > 0 
                                        ? (isAr ? 'يجب إفراغ القسم أولاً لحذفه' : 'Empty all items first to delete category') 
                                        : (isAr ? 'حذف القسم الخالي' : 'Delete Empty Category')
                                    }
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    // ─────────────── TAB: FEEDBACK ───────────────
                    <div className="lg:col-span-12 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#1E2230]/40 pb-3">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          {isAr ? 'التقييمات الواردة' : 'Incoming Feedback'}
                        </h2>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold bg-[#12141C] text-[#72B4FF] px-3 py-1 rounded-full border border-[#1E2230]">
                            {feedbackList.length} {isAr ? 'إجمالي' : 'Total'}
                          </span>
                          <button
                            onClick={loadFeedback}
                            className="text-[10px] px-3 py-1 rounded-full border border-[#1E2230] text-[#64748B] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                          >
                            {isAr ? 'تحديث' : 'Refresh'}
                          </button>
                        </div>
                      </div>

                      {feedbackLoading ? (
                        <div className="flex items-center justify-center py-20">
                          <Loader2 className="w-8 h-8 text-[#A66DDB] animate-spin" />
                        </div>
                      ) : feedbackList.length === 0 ? (
                        <div className="text-center py-20 bg-[#0E0E12]/40 rounded-2xl border border-[#1E2230] text-[#64748B] font-light">
                          {isAr ? 'لا يوجد تقييمات بعد.' : 'No feedback submitted yet.'}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {feedbackList.map((fb) => {
                            const isPending = fb.status === 'pending';
                            const isApproved = fb.status === 'approved';
                            const isHidden = fb.status === 'hidden';
                            return (
                              <div
                                key={fb.id}
                                className={`rounded-xl bg-[#0E0E12] border p-5 transition-all ${
                                  isPending
                                    ? 'border-[#E91E8C]/30 shadow-[0_0_12px_rgba(233,30,140,0.05)]'
                                    : isApproved
                                    ? 'border-green-500/20'
                                    : 'border-[#1E2230] opacity-60'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  {/* Left: Content */}
                                  <div className="flex-1 min-w-0">
                                    {/* Stars + Status */}
                                    <div className="flex items-center gap-3 mb-2">
                                      <div className="flex gap-0.5">
                                        {[1,2,3,4,5].map(n => (
                                          <Star key={n} className={`w-3.5 h-3.5 ${
                                            n <= fb.rating ? 'fill-[#A66DDB] text-[#A66DDB]' : 'text-[#1E2230] fill-transparent'
                                          }`} />
                                        ))}
                                      </div>
                                      <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold border ${
                                        isPending ? 'text-[#E91E8C] bg-[#E91E8C]/10 border-[#E91E8C]/20' :
                                        isApproved ? 'text-green-400 bg-green-950/30 border-green-500/20' :
                                        'text-[#64748B] bg-[#1E2230]/40 border-[#1E2230]'
                                      }`}>
                                        {isPending ? (isAr ? 'قيد الانتظار' : 'Pending') :
                                         isApproved ? (isAr ? 'معتمد' : 'Approved') :
                                         (isAr ? 'مخفي' : 'Hidden')}
                                      </span>
                                      <span className="text-[9px] text-[#64748B] font-mono">
                                        {new Date(fb.createdAt).toLocaleDateString('en-GB', {
                                          day: 'numeric', month: 'short', year: 'numeric',
                                        })}
                                      </span>
                                    </div>
                                    <p className="text-[11px] font-semibold text-[#A66DDB] mt-1">
                                      {fb.name}
                                    </p>
                                    <p className="text-sm text-[#F8FAFC]/80 font-light leading-relaxed mt-0.5">
                                      {fb.text}
                                    </p>
                                  </div>

                                  {/* Right: Action Buttons */}
                                  <div className="flex flex-col gap-2 shrink-0">
                                    {/* Show / Approve */}
                                    <button
                                      onClick={() => handleUpdateFeedback(fb.id, 'approved')}
                                      disabled={isApproved}
                                      title={isAr ? 'إظهار للعموم' : 'Show / Approve'}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-green-950/30 text-green-400 hover:bg-green-500/20 border border-green-500/20"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      {isAr ? 'إظهار' : 'Show'}
                                    </button>

                                    {/* Hide */}
                                    <button
                                      onClick={() => handleUpdateFeedback(fb.id, 'hidden')}
                                      disabled={isHidden}
                                      title={isAr ? 'إخفاء من العموم' : 'Hide from public'}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-[#1E2230]/60 text-[#64748B] hover:text-[#F8FAFC] hover:bg-[#1E2230] border border-[#1E2230]"
                                    >
                                      <EyeOff className="w-3.5 h-3.5" />
                                      {isAr ? 'إخفاء' : 'Hide'}
                                    </button>

                                    {/* Delete */}
                                    <button
                                      onClick={() => handleDeleteFeedback(fb.id)}
                                      title={isAr ? 'حذف نهائي' : 'Delete permanently'}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer bg-red-950/20 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/10"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      {isAr ? 'حذف' : 'Delete'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </>
  );
}
