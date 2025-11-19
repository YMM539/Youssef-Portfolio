"use client";

import React, { useState, useRef, useMemo } from "react";
import { cn } from "../../lib/utils.js";

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24], // هذا الرقم سيتم تجاهله لصالح الحساب التلقائي
  className,
  squaresClassName,
  ...props
}) {
  const containerRef = useRef(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  
  // نستخدم أبعاد ثابتة مبدئية لتجنب مشاكل الـ Hydration
  // سيتم تحديثها فوراً في المتصفح
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 1. حساب عدد المربعات بناءً على حجم الشاشة (مرة واحدة فقط عند تغيير الحجم)
  const { horizontal, vertical } = useMemo(() => {
    return {
      horizontal: Math.ceil(dimensions.width / width),
      vertical: Math.ceil(dimensions.height / height),
    };
  }, [dimensions, width, height]);

  // 2. مراقبة حجم الشاشة بكفاءة
  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  // 3. الدالة الذكية: تحسب المربع النشط رياضياً بدلاً من الاعتماد على Events لكل مربع
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // معادلة رياضية بسيطة لمعرفة رقم المربع
    const col = Math.floor(x / width);
    const row = Math.floor(y / height);
    
    const index = row * horizontal + col;
    
    // تحديث الحالة فقط إذا تغير المربع (لتقليل الـ Re-renders)
    if (index !== hoveredSquare && index >= 0 && index < horizontal * vertical) {
      setHoveredSquare(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredSquare(null);
  };

  return (
    <svg
      ref={containerRef}
      width="100%"
      height="100%"
      className={cn("absolute inset-0 h-full w-full border border-gray-400/30", className)}
      // الحدث الآن على الأب فقط (مرة واحدة) وليس على 2000 ابن
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        
        // هل هذا هو المربع النشط؟
        const isHovered = hoveredSquare === index;

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-gray-400/30 transition-all duration-100 ease-in-out", 
              // إزالة hover state من CSS واستبدالها بالكلاس المباشر للأداء
              isHovered ? "fill-gray-300/30" : "fill-transparent",
              squaresClassName
            )}
            // حذفنا الأحداث من هنا (onMouseEnter) لأنها كانت تسبب البطء
          />
        );
      })}
    </svg>
  );
}
