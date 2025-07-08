import { createClient } from '@supabase/supabase-js';
import type { APIContext } from 'astro';
// Configuración de Supabase
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST({ request }: APIContext) {
  try {
    const uniformeData = await request.json();
    
    // Validar datos requeridos y tipos correctos
    if (
      !uniformeData.nombre ||
      !uniformeData.genero ||
      !Array.isArray(uniformeData.tallas) ||
      uniformeData.precio === undefined ||
      uniformeData.stock === undefined
    ) {
      return new Response(
        JSON.stringify({ error: 'Faltan datos requeridos o formato incorrecto' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { data, error } = await supabase
      .from('uniformes')
      .insert([{
        nombre: uniformeData.nombre,
        genero: uniformeData.genero,
        tallas: uniformeData.tallas,
        precio: uniformeData.precio,
        stock: uniformeData.stock,
        imagen_hombre: uniformeData.imagen_hombre,
        imagen_mujer: uniformeData.imagen_mujer
      }])
      .select();
    
    if (error) {
      console.error('Error al insertar:', error);
      return new Response(
        JSON.stringify({ error: 'Error al crear el uniforme', detalle: error.message }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ data, message: 'Uniforme creado exitosamente' }), 
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error: any) {
    console.error('Error inesperado en POST /api/uniforme:', error);
    return new Response(
      JSON.stringify({ error: 'Error inesperado', detalle: error?.message || String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT({ request }: APIContext) {
  try {
    const uniformeData = await request.json();
    
    if (!uniformeData.id) {
      return new Response(
        JSON.stringify({ error: 'ID del uniforme requerido' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { data, error } = await supabase
      .from('uniformes')
      .update({
        nombre: uniformeData.nombre,
        genero: uniformeData.genero,
        tallas: uniformeData.tallas,
        precio: uniformeData.precio,
        stock: uniformeData.stock,
        imagen_hombre: uniformeData.imagen_hombre,
        imagen_mujer: uniformeData.imagen_mujer
      })
      .eq('id', uniformeData.id)
      .select();
    
    if (error) {
      console.error('Error al actualizar:', error);
      return new Response(
        JSON.stringify({ error: 'Error al actualizar el uniforme' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ data, message: 'Uniforme actualizado exitosamente' }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error en PUT:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE({ request }: APIContext) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID del uniforme requerido' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { error } = await supabase
      .from('uniformes')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error al eliminar:', error);
      return new Response(
        JSON.stringify({ error: 'Error al eliminar el uniforme' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ message: 'Uniforme eliminado exitosamente' }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error en DELETE:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('uniformes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error al obtener uniformes:', error);
      return new Response(
        JSON.stringify({ error: 'Error al obtener uniformes' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ data }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error en GET:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}