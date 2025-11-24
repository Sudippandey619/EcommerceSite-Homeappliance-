import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { SellerLayout } from '../seller/SellerLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  status: 'active' | 'inactive';
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'LG Refrigerator 260L',
    category: 'Refrigerators',
    price: 45000,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400',
    description: 'Smart inverter technology with energy saving',
    status: 'active',
  },
  {
    id: '2',
    name: 'Samsung Washing Machine 7kg',
    category: 'Washing Machines',
    price: 38500,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400',
    description: 'Front load with digital display',
    status: 'active',
  },
  {
    id: '3',
    name: 'Panasonic Microwave 23L',
    category: 'Microwaves',
    price: 12800,
    stock: 1,
    image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400',
    description: 'Convection microwave with auto cook menu',
    status: 'active',
  },
];

export const SellerProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
  });

  const categories = ['Refrigerators', 'Washing Machines', 'Microwaves', 'Air Conditioners', 'Dishwashers'];

  const handleAddProduct = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      toast.error('Please fill all required fields');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      description: formData.description,
      status: formData.status,
    };

    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success('Product added successfully!');
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id
        ? {
            ...p,
            name: formData.name,
            category: formData.category,
            price: Number(formData.price),
            stock: Number(formData.stock),
            image: formData.image || p.image,
            description: formData.description,
            status: formData.status,
          }
        : p
    );

    setProducts(updatedProducts);
    setEditingProduct(null);
    resetForm();
    toast.success('Product updated successfully!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image,
      description: product.description,
      status: product.status,
    });
  };

  const closeEditDialog = () => {
    setEditingProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      image: '',
      description: '',
      status: 'active',
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-gray-900 mb-2">Product Management</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-[#27AE60] to-[#F2994A] shadow-lg hover:shadow-xl transition-shadow"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Fill in the details to add a new product to your inventory</DialogDescription>
              </DialogHeader>
              <ProductForm
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                onSubmit={handleAddProduct}
                onCancel={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products by name or category..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>NPR {product.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.stock < 5 ? 'destructive' : 'default'}
                          className={product.stock < 5 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}
                        >
                          {product.stock} units
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        {editingProduct && (
          <Dialog open={!!editingProduct} onOpenChange={(open) => !open && closeEditDialog()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>Update product details</DialogDescription>
              </DialogHeader>
              <ProductForm
                formData={formData}
                setFormData={setFormData}
                categories={categories}
                onSubmit={handleEditProduct}
                onCancel={closeEditDialog}
                isEdit
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SellerLayout>
  );
};

interface ProductFormProps {
  formData: any;
  setFormData: (data: any) => void;
  categories: string[];
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  setFormData,
  categories,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            placeholder="e.g., LG Refrigerator 260L"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (NPR) *</Label>
          <Input
            id="price"
            type="number"
            placeholder="45000"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock Quantity *</Label>
          <Input
            id="stock"
            type="number"
            placeholder="12"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <div className="relative">
          <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="image"
            placeholder="https://example.com/image.jpg"
            className="pl-10"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>
        <p className="text-xs text-gray-500">Leave empty for default image</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Product description and features..."
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-[#27AE60] to-[#F2994A]"
        >
          {isEdit ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </div>
  );
};
