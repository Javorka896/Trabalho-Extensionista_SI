#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Center Ferramentas - Sistema Backend Simulado
Arquivo para simular armazenamento de dados de cadastro e carrinho
Sem uso de frameworks externos, apenas Python puro
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Any, Optional

class CenterFerramentasDB:
    """Classe para simular um banco de dados simples usando arquivos JSON"""
    
    def __init__(self, data_dir: str = "data"):
        self.data_dir = data_dir
        self.users_file = os.path.join(data_dir, "users.json")
        self.products_file = os.path.join(data_dir, "products.json")
        self.orders_file = os.path.join(data_dir, "orders.json")
        self.cart_file = os.path.join(data_dir, "cart.json")
        
        # Criar diretório de dados se não existir
        if not os.path.exists(data_dir):
            os.makedirs(data_dir)
        
        # Inicializar arquivos se não existirem
        self._initialize_files()
    
    def _initialize_files(self):
        """Inicializa os arquivos de dados com estruturas básicas"""
        
        # Inicializar arquivo de usuários
        if not os.path.exists(self.users_file):
            with open(self.users_file, 'w', encoding='utf-8') as f:
                json.dump([], f, ensure_ascii=False, indent=2)
        
        # Inicializar arquivo de produtos
        if not os.path.exists(self.products_file):
            products_data = [
                {
                    "id": 1,
                    "name": "Furadeira de Impacto 750W",
                    "price": 299.90,
                    "image": "assets/images/furadeira.jpg",
                    "rating": 4,
                    "category": "ferramentas-rotativas",
                    "description": "Furadeira de impacto profissional com 750W de potência",
                    "stock": 15,
                    "brand": "Bosch",
                    "created_at": datetime.now().isoformat()
                },
                {
                    "id": 2,
                    "name": "Esmerilhadeira Angular 4.1/2\"",
                    "price": 189.90,
                    "image": "assets/images/esmerilhadeira.jpg",
                    "rating": 5,
                    "category": "ferramentas-rotativas",
                    "description": "Esmerilhadeira angular para corte e desbaste",
                    "stock": 8,
                    "brand": "Makita",
                    "created_at": datetime.now().isoformat()
                },
                {
                    "id": 3,
                    "name": "Chave de Impacto Pneumática",
                    "price": 450.00,
                    "image": "assets/images/chave-impacto.jpg",
                    "rating": 4,
                    "category": "ferramentas-rotativas",
                    "description": "Chave de impacto pneumática para uso profissional",
                    "stock": 5,
                    "brand": "Ingersoll Rand",
                    "created_at": datetime.now().isoformat()
                },
                {
                    "id": 4,
                    "name": "Cone BT40 ER32",
                    "price": 125.50,
                    "image": "assets/images/cone-bt40.jpg",
                    "rating": 5,
                    "category": "cones-bt",
                    "description": "Cone BT40 com pinça ER32 para usinagem",
                    "stock": 12,
                    "brand": "Sandvik",
                    "created_at": datetime.now().isoformat()
                },
                {
                    "id": 5,
                    "name": "Paquímetro Digital 150mm",
                    "price": 89.90,
                    "image": "assets/images/paquimetro.jpg",
                    "rating": 4,
                    "category": "instrumentos-precisao",
                    "description": "Paquímetro digital de alta precisão 150mm",
                    "stock": 20,
                    "brand": "Mitutoyo",
                    "created_at": datetime.now().isoformat()
                },
                {
                    "id": 6,
                    "name": "Micrômetro Externo 0-25mm",
                    "price": 156.00,
                    "image": "assets/images/micrometro.jpg",
                    "rating": 5,
                    "category": "instrumentos-precisao",
                    "description": "Micrômetro externo de precisão 0-25mm",
                    "stock": 10,
                    "brand": "Starrett",
                    "created_at": datetime.now().isoformat()
                },
                {
                    "id": 7,
                    "name": "Parafusadeira Elétrica 12V",
                    "price": 199.90,
                    "image": "assets/images/parafusadeira.jpg",
                    "rating": 4,
                    "category": "ferramentas-rotativas",
                    "description": "Parafusadeira elétrica sem fio 12V com bateria",
                    "stock": 18,
                    "brand": "DeWalt",
                    "created_at": datetime.now().isoformat()
                },
                {
                    "id": 8,
                    "name": "Relógio Comparador 0,01mm",
                    "price": 78.50,
                    "image": "assets/images/relogio-comparador.jpg",
                    "rating": 4,
                    "category": "instrumentos-precisao",
                    "description": "Relógio comparador de precisão 0,01mm",
                    "stock": 7,
                    "brand": "Mitutoyo",
                    "created_at": datetime.now().isoformat()
                }
            ]
            
            with open(self.products_file, 'w', encoding='utf-8') as f:
                json.dump(products_data, f, ensure_ascii=False, indent=2)
        
        # Inicializar arquivo de pedidos
        if not os.path.exists(self.orders_file):
            with open(self.orders_file, 'w', encoding='utf-8') as f:
                json.dump([], f, ensure_ascii=False, indent=2)
        
        # Inicializar arquivo de carrinho
        if not os.path.exists(self.cart_file):
            with open(self.cart_file, 'w', encoding='utf-8') as f:
                json.dump({}, f, ensure_ascii=False, indent=2)
    
    def _read_json_file(self, file_path: str) -> Any:
        """Lê um arquivo JSON e retorna os dados"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return [] if file_path != self.cart_file else {}
    
    def _write_json_file(self, file_path: str, data: Any) -> bool:
        """Escreve dados em um arquivo JSON"""
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            print(f"Erro ao escrever arquivo {file_path}: {e}")
            return False
    
    # Métodos para gerenciar usuários
    def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Cria um novo usuário"""
        users = self._read_json_file(self.users_file)
        
        # Verificar se email já existe
        if any(user['email'] == user_data['email'] for user in users):
            return {"success": False, "message": "Email já cadastrado"}
        
        # Gerar ID único
        new_id = max([user.get('id', 0) for user in users], default=0) + 1
        
        # Criar novo usuário
        new_user = {
            "id": new_id,
            "name": user_data.get('name', ''),
            "phone": user_data.get('phone', ''),
            "email": user_data.get('email', ''),
            "address": user_data.get('address', ''),
            "cep": user_data.get('cep', ''),
            "password": user_data.get('password', ''),  # Em produção, seria hash
            "created_at": datetime.now().isoformat(),
            "active": True
        }
        
        users.append(new_user)
        
        if self._write_json_file(self.users_file, users):
            return {"success": True, "message": "Usuário criado com sucesso", "user_id": new_id}
        else:
            return {"success": False, "message": "Erro ao salvar usuário"}
    
    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Busca usuário por email"""
        users = self._read_json_file(self.users_file)
        return next((user for user in users if user['email'] == email), None)
    
    def get_all_users(self) -> List[Dict[str, Any]]:
        """Retorna todos os usuários"""
        return self._read_json_file(self.users_file)
    
    # Métodos para gerenciar produtos
    def get_all_products(self) -> List[Dict[str, Any]]:
        """Retorna todos os produtos"""
        return self._read_json_file(self.products_file)
    
    def get_product_by_id(self, product_id: int) -> Optional[Dict[str, Any]]:
        """Busca produto por ID"""
        products = self._read_json_file(self.products_file)
        return next((product for product in products if product['id'] == product_id), None)
    
    def get_products_by_category(self, category: str) -> List[Dict[str, Any]]:
        """Busca produtos por categoria"""
        products = self._read_json_file(self.products_file)
        return [product for product in products if product['category'] == category]
    
    def search_products(self, search_term: str) -> List[Dict[str, Any]]:
        """Busca produtos por termo"""
        products = self._read_json_file(self.products_file)
        search_term = search_term.lower()
        
        return [
            product for product in products
            if search_term in product['name'].lower() or 
               search_term in product.get('description', '').lower()
        ]
    
    def update_product_stock(self, product_id: int, quantity: int) -> bool:
        """Atualiza estoque do produto"""
        products = self._read_json_file(self.products_file)
        
        for product in products:
            if product['id'] == product_id:
                product['stock'] = max(0, product['stock'] - quantity)
                return self._write_json_file(self.products_file, products)
        
        return False
    
    # Métodos para gerenciar carrinho
    def get_cart(self, user_id: str = "guest") -> Dict[str, Any]:
        """Retorna carrinho do usuário"""
        carts = self._read_json_file(self.cart_file)
        return carts.get(user_id, {"items": [], "total": 0.0})
    
    def add_to_cart(self, user_id: str, product_id: int, quantity: int = 1) -> Dict[str, Any]:
        """Adiciona item ao carrinho"""
        carts = self._read_json_file(self.cart_file)
        
        if user_id not in carts:
            carts[user_id] = {"items": [], "total": 0.0}
        
        # Verificar se produto existe
        product = self.get_product_by_id(product_id)
        if not product:
            return {"success": False, "message": "Produto não encontrado"}
        
        # Verificar estoque
        if product['stock'] < quantity:
            return {"success": False, "message": "Estoque insuficiente"}
        
        # Verificar se item já existe no carrinho
        cart_items = carts[user_id]["items"]
        existing_item = next((item for item in cart_items if item['product_id'] == product_id), None)
        
        if existing_item:
            existing_item['quantity'] += quantity
        else:
            cart_items.append({
                "product_id": product_id,
                "name": product['name'],
                "price": product['price'],
                "image": product['image'],
                "quantity": quantity
            })
        
        # Recalcular total
        carts[user_id]["total"] = sum(item['price'] * item['quantity'] for item in cart_items)
        
        if self._write_json_file(self.cart_file, carts):
            return {"success": True, "message": "Item adicionado ao carrinho"}
        else:
            return {"success": False, "message": "Erro ao salvar carrinho"}
    
    def remove_from_cart(self, user_id: str, product_id: int) -> Dict[str, Any]:
        """Remove item do carrinho"""
        carts = self._read_json_file(self.cart_file)
        
        if user_id not in carts:
            return {"success": False, "message": "Carrinho não encontrado"}
        
        cart_items = carts[user_id]["items"]
        carts[user_id]["items"] = [item for item in cart_items if item['product_id'] != product_id]
        
        # Recalcular total
        carts[user_id]["total"] = sum(item['price'] * item['quantity'] for item in carts[user_id]["items"])
        
        if self._write_json_file(self.cart_file, carts):
            return {"success": True, "message": "Item removido do carrinho"}
        else:
            return {"success": False, "message": "Erro ao salvar carrinho"}
    
    def update_cart_quantity(self, user_id: str, product_id: int, quantity: int) -> Dict[str, Any]:
        """Atualiza quantidade de item no carrinho"""
        if quantity <= 0:
            return self.remove_from_cart(user_id, product_id)
        
        carts = self._read_json_file(self.cart_file)
        
        if user_id not in carts:
            return {"success": False, "message": "Carrinho não encontrado"}
        
        cart_items = carts[user_id]["items"]
        item = next((item for item in cart_items if item['product_id'] == product_id), None)
        
        if not item:
            return {"success": False, "message": "Item não encontrado no carrinho"}
        
        # Verificar estoque
        product = self.get_product_by_id(product_id)
        if product and product['stock'] < quantity:
            return {"success": False, "message": "Estoque insuficiente"}
        
        item['quantity'] = quantity
        
        # Recalcular total
        carts[user_id]["total"] = sum(item['price'] * item['quantity'] for item in cart_items)
        
        if self._write_json_file(self.cart_file, carts):
            return {"success": True, "message": "Quantidade atualizada"}
        else:
            return {"success": False, "message": "Erro ao salvar carrinho"}
    
    def clear_cart(self, user_id: str) -> Dict[str, Any]:
        """Limpa carrinho do usuário"""
        carts = self._read_json_file(self.cart_file)
        
        if user_id in carts:
            carts[user_id] = {"items": [], "total": 0.0}
            
            if self._write_json_file(self.cart_file, carts):
                return {"success": True, "message": "Carrinho limpo"}
            else:
                return {"success": False, "message": "Erro ao limpar carrinho"}
        
        return {"success": True, "message": "Carrinho já estava vazio"}
    
    # Métodos para gerenciar pedidos
    def create_order(self, user_id: str, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Cria um novo pedido"""
        cart = self.get_cart(user_id)
        
        if not cart["items"]:
            return {"success": False, "message": "Carrinho vazio"}
        
        orders = self._read_json_file(self.orders_file)
        
        # Gerar ID único para o pedido
        new_order_id = max([order.get('id', 0) for order in orders], default=0) + 1
        
        # Criar novo pedido
        new_order = {
            "id": new_order_id,
            "user_id": user_id,
            "user_data": user_data,
            "items": cart["items"].copy(),
            "total": cart["total"],
            "status": "pending",
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }
        
        orders.append(new_order)
        
        # Atualizar estoque dos produtos
        for item in cart["items"]:
            self.update_product_stock(item['product_id'], item['quantity'])
        
        # Limpar carrinho
        self.clear_cart(user_id)
        
        if self._write_json_file(self.orders_file, orders):
            return {
                "success": True, 
                "message": "Pedido criado com sucesso", 
                "order_id": new_order_id,
                "total": cart["total"]
            }
        else:
            return {"success": False, "message": "Erro ao salvar pedido"}
    
    def get_orders_by_user(self, user_id: str) -> List[Dict[str, Any]]:
        """Retorna pedidos do usuário"""
        orders = self._read_json_file(self.orders_file)
        return [order for order in orders if order['user_id'] == user_id]
    
    def get_all_orders(self) -> List[Dict[str, Any]]:
        """Retorna todos os pedidos"""
        return self._read_json_file(self.orders_file)
    
    def update_order_status(self, order_id: int, status: str) -> Dict[str, Any]:
        """Atualiza status do pedido"""
        orders = self._read_json_file(self.orders_file)
        
        for order in orders:
            if order['id'] == order_id:
                order['status'] = status
                order['updated_at'] = datetime.now().isoformat()
                
                if self._write_json_file(self.orders_file, orders):
                    return {"success": True, "message": "Status atualizado"}
                else:
                    return {"success": False, "message": "Erro ao atualizar status"}
        
        return {"success": False, "message": "Pedido não encontrado"}


# Classe para relatórios e estatísticas
class ReportsManager:
    """Classe para gerar relatórios e estatísticas"""
    
    def __init__(self, db: CenterFerramentasDB):
        self.db = db
    
    def get_sales_summary(self) -> Dict[str, Any]:
        """Retorna resumo de vendas"""
        orders = self.db.get_all_orders()
        
        total_orders = len(orders)
        total_revenue = sum(order['total'] for order in orders)
        
        # Produtos mais vendidos
        product_sales = {}
        for order in orders:
            for item in order['items']:
                product_id = item['product_id']
                if product_id not in product_sales:
                    product_sales[product_id] = {
                        'name': item['name'],
                        'quantity': 0,
                        'revenue': 0
                    }
                product_sales[product_id]['quantity'] += item['quantity']
                product_sales[product_id]['revenue'] += item['price'] * item['quantity']
        
        # Ordenar por quantidade vendida
        top_products = sorted(
            product_sales.items(), 
            key=lambda x: x[1]['quantity'], 
            reverse=True
        )[:5]
        
        return {
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "average_order_value": total_revenue / total_orders if total_orders > 0 else 0,
            "top_products": top_products
        }
    
    def get_inventory_status(self) -> List[Dict[str, Any]]:
        """Retorna status do estoque"""
        products = self.db.get_all_products()
        
        inventory_status = []
        for product in products:
            status = "normal"
            if product['stock'] == 0:
                status = "out_of_stock"
            elif product['stock'] <= 5:
                status = "low_stock"
            
            inventory_status.append({
                "id": product['id'],
                "name": product['name'],
                "stock": product['stock'],
                "status": status,
                "price": product['price']
            })
        
        return sorted(inventory_status, key=lambda x: x['stock'])


# Função principal para demonstração
def main():
    """Função principal para demonstrar o uso do sistema"""
    print("=== Center Ferramentas - Sistema Backend ===\n")
    
    # Inicializar banco de dados
    db = CenterFerramentasDB()
    reports = ReportsManager(db)
    
    print("1. Testando cadastro de usuário...")
    user_data = {
        "name": "João Silva",
        "phone": "(34) 99999-9999",
        "email": "joao@email.com",
        "address": "Rua das Flores, 123",
        "cep": "38400-000",
        "password": "123456"
    }
    
    result = db.create_user(user_data)
    print(f"Resultado: {result}")
    
    print("\n2. Testando busca de produtos...")
    products = db.search_products("furadeira")
    print(f"Produtos encontrados: {len(products)}")
    for product in products:
        print(f"- {product['name']} - R$ {product['price']}")
    
    print("\n3. Testando carrinho de compras...")
    user_id = "guest"
    
    # Adicionar produtos ao carrinho
    db.add_to_cart(user_id, 1, 2)  # 2 furadeiras
    db.add_to_cart(user_id, 5, 1)  # 1 paquímetro
    
    cart = db.get_cart(user_id)
    print(f"Itens no carrinho: {len(cart['items'])}")
    print(f"Total: R$ {cart['total']:.2f}")
    
    print("\n4. Testando criação de pedido...")
    order_result = db.create_order(user_id, user_data)
    print(f"Resultado: {order_result}")
    
    print("\n5. Gerando relatório de vendas...")
    sales_summary = reports.get_sales_summary()
    print(f"Total de pedidos: {sales_summary['total_orders']}")
    print(f"Receita total: R$ {sales_summary['total_revenue']:.2f}")
    
    print("\n6. Status do estoque...")
    inventory = reports.get_inventory_status()
    print("Produtos com estoque baixo:")
    for item in inventory[:3]:
        print(f"- {item['name']}: {item['stock']} unidades ({item['status']})")
    
    print("\n=== Teste concluído com sucesso! ===")


if __name__ == "__main__":
    main()

