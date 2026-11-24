import React from 'react'
import { DANGER_STEPS, dangerConfig, dangerLevels } from '../config/dangerConfig'
import type { DangerType } from '../config/dangerConfig'

interface RiskMeterProps {
    danger: DangerType
}

// Os quatro níveis são uma escala, não quatro rótulos soltos: o medidor mostra
// onde a denúncia cai dentro dela. É o único lugar do card que usa a cor do nível,
// a pílula, o ícone e a faixa lateral diziam a mesma coisa três vezes.
const RiskMeter: React.FC<RiskMeterProps> = ({ danger }) => {

    const config = dangerConfig[danger]

    return (
        <div className='shrink-0 flex flex-col items-end gap-1.5'>
            <span className={`text-xs font-semibold tracking-wide ${config.text}`}>
                {config.label}
            </span>

            <span
                role='img'
                aria-label={`Nível de perigo ${config.rank} de ${DANGER_STEPS}: ${config.label}`}
                className='flex items-center gap-1'
            >
                {dangerLevels.map((level, index) => (
                    <span
                        key={level}
                        className={`w-4 h-1 rounded-full ${index < config.rank ? config.bar : 'bg-gray-200 dark:bg-gray-800'}`}
                    />
                ))}
            </span>
        </div>
    )
}

export default RiskMeter
